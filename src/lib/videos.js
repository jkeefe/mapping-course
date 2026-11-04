// Vimeo video data
// Embed URL: https://player.vimeo.com/video/{id}?h={hash}
// free: true = no login required

export const weeks = [
  {
    week: 1,
    title: 'Week 1 — Making Maps with Datawrapper',
    videos: [
      { id: '1148817130', hash: '53f96f9914', title: 'Shapes & Data with Datawrapper', free: true },
      { id: '1148818116', hash: 'b4da7645c7', title: 'Coloring & Classification with Datawrapper', free: false },
      { id: '1148818622', hash: 'd137d61902', title: 'Annotation & Publishing with Datawrapper', free: false },
      { id: '1148819222', hash: 'b037cd597d', title: 'Finding and Using Geographic Files', free: false },
      { id: '1148819919', hash: 'a7756316ed', title: 'Mapping Data Without Joining to Shapes', free: false }
    ]
  },
  {
    week: 2,
    title: 'Week 2 — Geographic Data and Good Practice',
    videos: [
      { id: '1148821054', hash: '51716734cc', title: 'Tips, Tricks and Pitfalls to Avoid', free: true },
      { id: '1148823111', hash: 'a68343f2e0', title: 'Ethical Considerations for Location Data', free: false },
      { id: '1148824159', hash: '9aaa28bb6a', title: 'Making Your Own Geographic Files', free: false },
      { id: '1148824970', hash: 'c8e9285f56', title: 'Introduction to Tiled Maps', free: false }
    ]
  },
  {
    week: 3,
    title: 'Week 3 — Building with Protomaps',
    videos: [
      { id: '1148826006', hash: 'babf87efcf', title: 'Your Copy of the Code Plus Codespaces', free: true },
      { id: '1148826747', hash: '30246e873e', title: 'Our First Protomap', free: false },
      { id: '1148827866', hash: '058a4f418d', title: 'Making a Slice of the Planet for Your Basemap', free: false },
      { id: '1148829097', hash: 'a2e06d8f69', title: 'Styling our Protomap', free: false },
      { id: '1148830588', hash: 'f15bfa4869', title: 'Mapping Large Datasets with Protomaps', free: false }
    ]
  },
  {
    week: 4,
    title: 'Week 4 — Hosting and Publishing Your Maps',
    videos: [
      { id: '1148834350', hash: '04247c0a12', title: 'Options for Hosting Protomaps on the Internet', free: true },
      { id: '1148836958', hash: '62f2b5eefd', title: 'Basic Map Hosting with Amazon Web Services', free: false },
      { id: '1148838036', hash: '3ecae65c3e', title: 'Basic Map Hosting with AWS — Continued', free: false },
      { id: '1148838591', hash: '6d449ee69e', title: 'More Robust Map Hosting with Amazon Web Services', free: false },
      { id: '1148840105', hash: 'e8fbfdbb6d', title: 'Embedding Protomaps into Stories and Websites', free: false }
    ]
  }
];

export function vimeoEmbedUrl(video) {
  return `https://player.vimeo.com/video/${video.id}?h=${video.hash}&color=ffffff&title=0&byline=0&portrait=0`;
}

export function vimeoThumbnailUrl(video) {
  return `https://vumbnail.com/${video.id}.jpg`;
}
