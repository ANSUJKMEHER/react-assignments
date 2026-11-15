// Fallback demonstration dataset matching the exact initial photos from the assignment reference screenshot
// Used ONLY when external Picsum Photos API times out (Cloudflare 522) or encounters network failure
export const FALLBACK_PAGES = {
  1: [
    {
      id: "0",
      author: "Alejandro Escamilla",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/yC-Yzbqy7PY",
      download_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "1",
      author: "Vadim Sherbakov",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/LNRyGwIJr5c",
      download_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "2",
      author: "Alex",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/LF8gK8GmZmU",
      download_url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "3",
      author: "Daniel Genser",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/e1jxkygzb3I",
      download_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "4",
      author: "Justin Leibow",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/2aD48fP6v4A",
      download_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "5",
      author: "Alexander Shustov",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/1pPZ_34aR_U",
      download_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80"
    }
  ],
  2: [
    {
      id: "6",
      author: "Alejandro Escamilla",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/uKkSkL0Wv2E",
      download_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "7",
      author: "Goosetabel",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/d9aP8eE5f3E",
      download_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "8",
      author: "Danielle MacInnes",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/8bN_fP_kUuE",
      download_url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "9",
      author: "Jerry Zhang",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/9c_E5fE5f3E",
      download_url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&auto=format&fit=crop&q=80"
    }
  ]
};

export function getFallbackPhotos(page) {
  return FALLBACK_PAGES[page] || [];
}
