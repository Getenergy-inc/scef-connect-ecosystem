-- Add thumbnail_url column for custom AI-generated graphics
ALTER TABLE public.digital_board_items 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.digital_board_items.thumbnail_url IS 'URL for AI-generated promotional flyer/graphic for this board item';