# Add YouTube Wedding Video to Portfolio

## Summary
Add the YouTube video "Eli and Hannah Gibson Wedding Final 4k" (https://youtu.be/6OO3oZ9VxjY) to the portfolio as the first/featured project.

## Changes

### 1. Update `src/data/projects.ts`
Insert a new `Project` object at the **top** of the `projects` array (before the existing "Dr. Pepper Mural" entry).

**New project entry:**
- `id`: `'eli-hannah-gibson-wedding'`
- `title`: `'Eli and Hannah Gibson Wedding'`
- `category`: `'weddings'`
- `year`: `2025` (assumed recent; will confirm)
- `description`: `'Wedding highlight video for Eli and Hannah Gibson'`
- `longDescription`: `'Cinematic wedding highlight video capturing the beautiful ceremony and celebration of Eli and Hannah Gibson. Features emotional moments, candid interactions, and stunning visuals in 4K.'`
- `role`: `'Videographer & Editor'`
- `tools`: `['Final Cut Pro']`
- `videoUrl`: `'https://www.youtube.com/embed/6OO3oZ9VxjY'`
- `thumbnailUrl`: `'https://i.ytimg.com/vi/6OO3oZ9VxjY/maxresdefault.jpg'`
- `thumbnailZoom`: `1.4` (to ensure it fills the thumbnail box nicely)
- `galleryUrls`: `[]`

### 2. Verify
- Open the Portfolio app/window in the live preview.
- Confirm the new wedding video appears **first** in the grid/list.
- Confirm the thumbnail loads correctly and fills the box.
- Click to play and confirm the YouTube embed loads.

## Notes
- Uses YouTube's maxresdefault thumbnail for best quality.
- The `thumbnailZoom: 1.4` ensures the thumbnail covers the entire card area (matching the pattern used for other YouTube-based projects like Zilker Brewing and Clayton Homes).