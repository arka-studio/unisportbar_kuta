# UNI Sport Bar Cafe — LP Asset Mapping

## Asset inventory
The `usb_kuta` directory contains the supplied photo assets plus the logo candidate and a 1-byte test file.

## Section mapping

| LP section | Asset selection | Notes |
|---|---|---|
| Hero | Best wide interior/panoramic image | Prefer strong sports-bar atmosphere and negative space for headline |
| Experience / About | Interior + people/bar atmosphere | Establish the venue experience |
| Food & Drinks | Food close-ups + drinks/bar images | Use portrait images for cards where appropriate |
| Sports | Sports-screen / match-viewing image | Prioritize clearly visible screens and seating |
| Events | Crowd / live-event atmosphere | Supports Live Music, Game Day, Happy Hour messaging |
| Gallery | 6–9 strongest images | Mix interior, food, drinks, people, and exterior |
| Location | Exterior/signage image | Use as final visual before map/contact |
| Header / Footer | `file_0000000057d881faba2dd205f0670fa8.png` | Treat as logo candidate; visual verification still required |

## Files to exclude

- `usb_kuta/test` — 1-byte file; not a usable LP asset.

## Verification note

The GitHub connector can read the repository metadata but cannot decode the supplied binary image files for visual inspection. Therefore the exact filename-to-section assignment should be finalized only after generating or viewing thumbnails/contact sheets of the images.

## Recommended implementation order

1. Verify logo candidate.
2. Generate a contact sheet of all 21 image assets.
3. Assign each verified filename to the sections above.
4. Add responsive crop/focal-point rules for desktop and mobile.
5. Keep the original assets untouched and reference them from the LP.
