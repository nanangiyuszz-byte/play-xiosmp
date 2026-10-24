CREATE TABLE public.registered_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE CHECK (char_length(username) BETWEEN 3 AND 16),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.registered_players TO anon, authenticated;
GRANT ALL ON public.registered_players TO service_role;
ALTER TABLE public.registered_players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view registered players" ON public.registered_players FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL CHECK (char_length(username) BETWEEN 2 AND 32),
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (char_length(comment) BETWEEN 3 AND 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can submit reviews" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (rating BETWEEN 1 AND 5);

CREATE TABLE public.community_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL CHECK (char_length(username) BETWEEN 2 AND 32),
  category text NOT NULL CHECK (category IN ('keluh_kesah','rekomendasi_fitur')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.community_feedback TO anon, authenticated;
GRANT ALL ON public.community_feedback TO service_role;
ALTER TABLE public.community_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit feedback" ON public.community_feedback FOR INSERT TO anon, authenticated WITH CHECK (category IN ('keluh_kesah','rekomendasi_fitur'));