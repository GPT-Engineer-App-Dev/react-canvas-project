import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

EventSignup // table: event_signups
    id: string
    event_id: number
    name: string
    email: string
    created_at: string

Event // table: events
    id: number
    created_at: string
    name: string
    date: string
    description: string
    venue_id: number
    is_pinned: boolean
    image_url: string
    pdf_url: string
    latitude: number
    longitude: number

Comment // table: comments
    id: number
    created_at: string
    content: string
    event_id: number

Venue // table: venues
    id: number
    name: string
    location: string
    description: string
    created_at: string
    updated_at: string

*/

// Example hook for models

export const useEventSignups = () => useQuery({
    queryKey: ['event_signups'],
    queryFn: () => fromSupabase(supabase.from('event_signups').select('*')),
});
export const useAddEventSignup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSignup) => fromSupabase(supabase.from('event_signups').insert([newSignup])),
        onSuccess: () => {
            queryClient.invalidateQueries('event_signups');
        },
    });
};

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*')),
});
export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

// Hook for login
export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ email, password }) => {
            const { error, user } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return user;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
            },
        }
    );
};

// Hook for registration
export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ email, password }) => {
            const { error, user } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            return user;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
            },
        }
    );
};

// Hook for logout
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
            },
        }
    );
};

// Hook for authentication state
export const useAuth = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    return user;
};

