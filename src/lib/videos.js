// Vimeo video data
// Embed URL: https://player.vimeo.com/video/{id}?h={hash}
// free: true = no login required

export const weeks = [
  {
    week: 1,
    title: 'Week 1 — Getting Started with Maps',
    videos: [
      { id: '1148817130', hash: '53f96f9914', title: 'Introduction & Setup', free: true },
      { id: '1148818116', hash: 'b4da7645c7', title: 'Your First Map', free: false },
      { id: '1148818622', hash: 'd137d61902', title: 'Map Layers & Styles', free: false },
      { id: '1148819222', hash: 'b037cd597d', title: 'Working with Data', free: false },
      { id: '1148819919', hash: 'a7756316ed', title: 'Publishing Your Map', free: false }
    ]
  },
  {
    week: 2,
    title: 'Week 2 — Protomaps Deep Dive',
    videos: [
      { id: '1148821054', hash: '51716734cc', title: 'What is Protomaps?', free: true },
      { id: '1148823111', hash: 'a68343f2e0', title: 'PMTiles Format', free: false },
      { id: '1148824159', hash: '9aaa28bb6a', title: 'Creating Tile Sets', free: false },
      { id: '1148824970', hash: 'c8e9285f56', title: 'Custom Basemaps', free: false }
    ]
  },
  {
    week: 3,
    title: 'Week 3 — Data & Interactivity',
    videos: [
      { id: '1148826006', hash: 'babf87efcf', title: 'GeoJSON & Vector Data', free: true },
      { id: '1148826747', hash: '30246e873e', title: 'Filtering & Querying', free: false },
      { id: '1148827866', hash: '058a4f418d', title: 'Popups & Tooltips', free: false },
      { id: '1148829097', hash: 'a2e06d8f69', title: 'Map Controls', free: false },
      { id: '1148830588', hash: 'f15bfa4869', title: 'Animations & Transitions', free: false }
    ]
  },
  {
    week: 4,
    title: 'Week 4 — Building Real Projects',
    videos: [
      { id: '1148834350', hash: '04247c0a12', title: 'Project Architecture', free: true },
      { id: '1148836958', hash: '62f2b5eefd', title: 'Integrating APIs', free: false },
      { id: '1148838036', hash: '3ecae65c3e', title: 'Performance & Optimization', free: false },
      { id: '1148838591', hash: '6d449ee69e', title: 'Deployment Strategies', free: false },
      { id: '1148840105', hash: 'e8fbfdbb6d', title: 'Final Project Walkthrough', free: false }
    ]
  }
];

export function vimeoEmbedUrl(video) {
  return `https://player.vimeo.com/video/${video.id}?h=${video.hash}&color=ffffff&title=0&byline=0&portrait=0`;
}

export function vimeoThumbnailUrl(video) {
  return `https://vumbnail.com/${video.id}.jpg`;
}
