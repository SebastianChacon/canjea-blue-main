-- Create table for loan requests
CREATE TABLE public.loan_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  object_type TEXT NOT NULL,
  loan_amount NUMERIC NOT NULL,
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loan_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required)
CREATE POLICY "Anyone can submit loan requests"
ON public.loan_requests
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for loan images
INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-images', 'loan-images', true);

-- Allow public uploads to loan-images bucket
CREATE POLICY "Anyone can upload loan images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'loan-images');

-- Allow public read access to loan images
CREATE POLICY "Anyone can view loan images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'loan-images');