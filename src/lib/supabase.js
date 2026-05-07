import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createMissingConfigClient() {
	const error = new Error('Supabase environment variables are missing.');

	const query = {
		select() { return this; },
		order() { return this; },
		eq() { return this; },
		or() { return this; },
		limit() { return this; },
		single() { return this; },
		maybeSingle() { return this; },
		insert() { return this; },
		update() { return this; },
		delete() { return this; },
		upsert() { return this; },
		then(resolve) {
			return Promise.resolve({ data: null, error }).then(resolve);
		},
		catch() {
			return Promise.resolve({ data: null, error });
		},
		finally(callback) {
			callback?.();
			return Promise.resolve({ data: null, error });
		},
	};

	return {
		from() {
			return query;
		},
	};
}

export const supabase = supabaseUrl && supabaseAnonKey
	? createClient(supabaseUrl, supabaseAnonKey)
	: createMissingConfigClient();
