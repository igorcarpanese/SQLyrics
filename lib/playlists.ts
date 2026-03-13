export type Playlist = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  artists: string[];
};

export const PLAYLISTS: Playlist[] = [
  {
    id: "disney",
    name: "Disney Songs",
    description: "Magical soundtracks and classic singalongs from your favorite movies.",
    coverColor: "from-blue-500 to-cyan-400",
    artists: [
      "Disney",
      "Phil Collins",
      "Elton John",
      "Idina Menzel",
      "Auli'i Cravalho",
      "Kristen Bell",
      "TOKYO Disney Resort"
    ],
  },
  {
    id: "naruto",
    name: "Naruto Openings",
    description: "Believe it! The most iconic anime openings and endings.",
    coverColor: "from-orange-500 to-amber-600",
    artists: [
      "GODAI NATSUKO",
      "NARUTO YASUMIWAKA",
      "Ikimonogakari",
      "ASIAN KUNG-FU GENERATION",
      "KANA-BOON",
      "FLOW",
      "Sambomaster"
    ],
  },
  {
    id: "br-hits",
    name: "Músicas Brasileiras",
    description: "Do axé ao funk, os maiores sucessos do Brasil.",
    coverColor: "from-green-500 to-yellow-500",
    artists: [
      "Anitta",
      "Ludmilla",
      "Ivete Sangalo",
      "Pabllo Vittar",
      "Gloria Groove",
      "Sandy",
      "Ed Motta",
      "Daniela Mercury"
    ],
  },
  {
    id: "k-pop",
    name: "K-Pop",
    description: "Get ready to dance to the biggest global k-pop hits.",
    coverColor: "from-fuchsia-400 to-purple-600",
    artists: [
      "BTS",
      "Blackpink",
      "BlackPink",
      "BLACKPINK (kpop)",
      "Twice",
      "2NE1 (kpop)",
      "(G)I-DLE (kpop)",
      "Red Velvet",
      "EXO",
      "Seventeen"
    ],
  },
  {
    id: "pop-divas",
    name: "Pop Divas",
    description: "The queens of pop, perfect for belting it out.",
    coverColor: "from-pink-500 to-rose-500",
    artists: [
      "Beyonce",
      "Taylor Swift",
      "Lady Gaga",
      "Rihanna",
      "Adele",
      "Katy Perry",
      "Britney Spears",
      "Ariana Grande"
    ],
  },
  {
    id: "rock-classics",
    name: "Rock Classics",
    description: "Bring the house down with these legendary rock anthems.",
    coverColor: "from-amber-600 to-red-700",
    artists: [
      "Linkin Park",
      "System Of A Down",
      "Queen",
      "Guns N' Roses",
      "Nirvana",
      "Bon Jovi",
      "Aerosmith",
      "AC/DC"
    ],
  },
  {
    id: "brasil-sertanejo",
    name: "Sertanejo Universitário",
    description: "O melhor do sertanejo para cantar junto com a galera.",
    coverColor: "from-yellow-400 to-orange-500",
    artists: [
      "Marília Mendonça",
      "Jorge & Mateus",
      "Gusttavo Lima",
      "Henrique & Juliano",
      "Maiara & Maraisa",
      "Zé Neto & Cristiano"
    ],
  },
  {
    id: "br-pagode",
    name: "Pagodinho de Domingo",
    description: "Aquela roda de samba e pagode que não pode faltar.",
    coverColor: "from-emerald-400 to-teal-500",
    artists: [
      "Exaltasamba",
      "Thiaguinho",
      "Raça Negra",
      "Sorriso Maroto",
      "Zeca Pagodinho",
      "Pixote"
    ],
  },
  {
    id: "2000s-nostalgia",
    name: "2000s Nostalgia",
    description: "Throwback hits from the turn of the millennium.",
    coverColor: "from-blue-400 to-indigo-500",
    artists: [
      "Avril Lavigne",
      "Black Eyed Peas",
      "Eminem",
      "50 Cent",
      "Coldplay",
      "Maroon 5",
      "Kelly Clarkson"
    ],
  }
];

export function getPlaylist(id: string): Playlist | undefined {
  return PLAYLISTS.find(p => p.id === id);
}
