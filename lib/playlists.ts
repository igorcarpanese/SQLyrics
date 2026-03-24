export type Playlist = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  artists: string[];
  codes?: string[];
  songMetadata?: Record<string, string>;
};

export const BRAZILIAN_ARTISTS = [
  { name: "Zezé Di Camargo e Luciano", genre: "Sertanejo & Modão" },
  { name: "Bruno e Marrone", genre: "Sertanejo & Modão" },
  { name: "Wesley Safadão", genre: "Sertanejo & Modão" },
  { name: "Gusttavo Lima", genre: "Sertanejo & Modão" },
  { name: "Luan Santana", genre: "Sertanejo & Modão" },
  { name: "Jorge e Mateus", genre: "Sertanejo & Modão" },
  { name: "Marília Mendonça", genre: "Sertanejo & Modão" },
  { name: "Amado Batista", genre: "Sertanejo & Modão" },
  { name: "Leonardo", genre: "Sertanejo & Modão" },
  { name: "Henrique e Juliano", genre: "Sertanejo & Modão" },
  { name: "Chitãozinho e Xororó", genre: "Sertanejo & Modão" },
  { name: "Michel Teló", genre: "Sertanejo & Modão" },
  { name: "Rionegro e Solimões", genre: "Sertanejo & Modão" },
  { name: "Eduardo Costa", genre: "Sertanejo & Modão" },
  { name: "Víctor e Léo", genre: "Sertanejo & Modão" },
  { name: "Paula Fernandes", genre: "Sertanejo & Modão" },
  { name: "Maiara e Maraísa", genre: "Sertanejo & Modão" },
  { name: "Daniel", genre: "Sertanejo & Modão" },
  { name: "Zé Neto e Cristiano", genre: "Sertanejo & Modão" },
  { name: "Fagner", genre: "Sertanejo & Modão" },
  { name: "Leandro e Leonardo", genre: "Sertanejo & Modão" },
  { name: "Matheus e Kauan", genre: "Sertanejo & Modão" },
  { name: "Fernando e Sorocaba", genre: "Sertanejo & Modão" },
  { name: "Os Barões da Pisadinha", genre: "Sertanejo & Modão" },
  { name: "Rick e Renner", genre: "Sertanejo & Modão" },
  { name: "Guilherme e Santiago", genre: "Sertanejo & Modão" },
  { name: "João Bosco e Vinícius", genre: "Sertanejo & Modão" },
  { name: "Lucas Lucco", genre: "Sertanejo & Modão" },
  { name: "Naiara Azevedo", genre: "Sertanejo & Modão" },
  { name: "Simone e Simaria", genre: "Sertanejo & Modão" },
  { name: "Gian e Giovani", genre: "Sertanejo & Modão" },
  { name: "Marcos e Belutti", genre: "Sertanejo & Modão" },
  { name: "Milionário e José Rico", genre: "Sertanejo & Modão" },
  { name: "Thaeme e Thiago", genre: "Sertanejo & Modão" },
  { name: "João Neto e Frederico", genre: "Sertanejo & Modão" },
  { name: "Matogrosso e Mathias", genre: "Sertanejo & Modão" },
  { name: "Teodoro e Sampaio", genre: "Sertanejo & Modão" },
  { name: "Edson e Hudson", genre: "Sertanejo & Modão" },
  { name: "César Menotti e Fabiano", genre: "Sertanejo & Modão" },
  { name: "Jonas Esticado", genre: "Sertanejo & Modão" },
  { name: "Cristiano Araújo", genre: "Sertanejo & Modão" },
  { name: "Felipe Araújo", genre: "Sertanejo & Modão" },
  { name: "Sérgio Reis", genre: "Sertanejo & Modão" },
  { name: "Léo Magalhães", genre: "Sertanejo & Modão" },
  { name: "Zé Felipe", genre: "Sertanejo & Modão" },
  { name: "Maria Cecília e Rodolfo", genre: "Sertanejo & Modão" },
  { name: "Israel e Rodolffo", genre: "Sertanejo & Modão" },
  { name: "José Augusto", genre: "Sertanejo & Modão" },
  { name: "João Gomes", genre: "Sertanejo & Modão" },
  { name: "Trio Parada Dura", genre: "Sertanejo & Modão" },
  { name: "Mano Walter", genre: "Sertanejo & Modão" },
  { name: "Bonde do Forró", genre: "Sertanejo & Modão" },
  { name: "Cezar e Paulinho", genre: "Sertanejo & Modão" },
  { name: "Gino e Geno", genre: "Sertanejo & Modão" },
  { name: "Zé Vaqueiro", genre: "Sertanejo & Modão" },
  { name: "Almir Sater", genre: "Sertanejo & Modão" },
  { name: "Christian e Ralf", genre: "Sertanejo & Modão" },
  { name: "Daniela", genre: "Sertanejo & Modão" },
  { name: "Lauana Prado", genre: "Sertanejo & Modão" },
  { name: "Yasmin Santos", genre: "Sertanejo & Modão" },
  { name: "Roberta Miranda", genre: "Sertanejo & Modão" },
  { name: "Renato Teixeira", genre: "Sertanejo & Modão" },
  { name: "Gaby Amarantos", genre: "Sertanejo & Modão" },
  { name: "Roberto Carlos", genre: "Pop & Diversos" },
  { name: "Ivete Sangalo", genre: "Axé & Forró" },
  { name: "Aviões do Forró", genre: "Axé & Forró" },
  { name: "Roupa Nova", genre: "Pop & Diversos" },
  { name: "Banda Calypso", genre: "Axé & Forró" },
  { name: "Sandy e Júnior", genre: "Pop & Diversos" },
  { name: "Ana Carolina", genre: "Pop & Diversos" },
  { name: "Calcinha Preta", genre: "Axé & Forró" },
  { name: "Anitta", genre: "Funk" },
  { name: "Fábio Jr.", genre: "Pop & Diversos" },
  { name: "Babado Novo", genre: "Axé & Forró" },
  { name: "Lulu Santos", genre: "Pop & Diversos" },
  { name: "Alexandre Pires", genre: "Pop & Diversos" },
  { name: "Kelly Key", genre: "Pop & Diversos" },
  { name: "Ludmilla", genre: "Funk" },
  { name: "Pabllo Vittar", genre: "Pop & Diversos" },
  { name: "Lexa", genre: "Funk" },
  { name: "Luísa Sonza", genre: "Pop & Diversos" },
  { name: "IZA", genre: "Pop & Diversos" },
  { name: "Banda Eva", genre: "Axé & Forró" },
  { name: "Chiclete com Banana", genre: "Pop & Diversos" },
  { name: "Asa de Águia", genre: "Axé & Forró" },
  { name: "É o Tchan", genre: "Axé & Forró" },
  { name: "Claudia Leitte", genre: "Axé & Forró" },
  { name: "Daniela Mercury", genre: "Axé & Forró" },
  { name: "Cavaleiros do Forró", genre: "Axé & Forró" },
  { name: "Xand Avião", genre: "Axé & Forró" },
  { name: "Companhia do Calypso", genre: "Axé & Forró" },
  { name: "Mastruz Com Leite", genre: "Axé & Forró" },
  { name: "Banda Cheiro de Amor", genre: "Axé & Forró" },
  { name: "KLB", genre: "Pop & Diversos" },
  { name: "Latino", genre: "Pop & Diversos" },
  { name: "Banda Magníficos", genre: "Axé & Forró" },
  { name: "RBD (Rebelde)", genre: "Pop & Diversos" },
  { name: "Gatinha Manhosa", genre: "Axé & Forró" },
  { name: "Jammil e Uma Noites", genre: "Axé & Forró" },
  { name: "Margareth Menezes", genre: "Axé & Forró" },
  { name: "Léo Santana", genre: "Axé & Forró" },
  { name: "Banda Beijo", genre: "Axé & Forró" },
  { name: "Timbalada", genre: "Axé & Forró" },
  { name: "Netinho", genre: "Axé & Forró" },
  { name: "Harmonia do Samba", genre: "Axé & Forró" },
  { name: "Banda Mel", genre: "Axé & Forró" },
  { name: "Olodum", genre: "Axé & Forró" },
  { name: "Ara Ketu", genre: "Axé & Forró" },
  { name: "Tchakabum", genre: "Axé & Forró" },
  { name: "Saulo Fernandes", genre: "Axé & Forró" },
  { name: "Sandy", genre: "Pop & Diversos" },
  { name: "Wanessa Camargo", genre: "Pop & Diversos" },
  { name: "Rouge", genre: "Pop & Diversos" },
  { name: "Br'oz", genre: "Pop & Diversos" },
  { name: "Tihuana", genre: "Pop & Diversos" },
  { name: "D'Black", genre: "Pop & Diversos" },
  { name: "Perlla", genre: "Pop & Diversos" },
  { name: "Mc Kevinho", genre: "Funk" },
  { name: "Mc Bin Laden", genre: "Funk" },
  { name: "Mc Livinho", genre: "Funk" },
  { name: "Mc Loma", genre: "Funk" },
  { name: "Mc Gui", genre: "Funk" },
  { name: "Mc Don Juan", genre: "Funk" },
  { name: "Mc Kekel", genre: "Funk" },
  { name: "Mc Bruninho", genre: "Funk" },
  { name: "Mc Davi", genre: "Funk" },
  { name: "Mc G15", genre: "Funk" },
  { name: "Mc Koringa", genre: "Funk" },
  { name: "Mc Kevin o Chris", genre: "Funk" },
  { name: "Mc Sapão", genre: "Funk" },
  { name: "Mc Wm", genre: "Funk" },
  { name: "MC Kevin", genre: "Funk" },
  { name: "Mc Lan", genre: "Funk" },
  { name: "Mc Leozinho", genre: "Funk" },
  { name: "Nego do Borel", genre: "Funk" },
  { name: "Bonde do Tigrão", genre: "Funk" },
  { name: "MC Marcinho", genre: "Funk" },
  { name: "Claudinho e Buchecha", genre: "Funk" },
  { name: "Buchecha", genre: "Funk" },
  { name: "Glória Groove", genre: "Pop & Diversos" },
  { name: "MC Guimê", genre: "Funk" },
  { name: "Valesca Popozuda", genre: "Funk" },
  { name: "Raça Negra", genre: "Samba & Pagode" },
  { name: "Sorriso Maroto", genre: "Samba & Pagode" },
  { name: "Marisa Monte", genre: "MPB & Bossa Nova" },
  { name: "Zeca Pagodinho", genre: "Samba & Pagode" },
  { name: "Caetano Veloso", genre: "MPB & Bossa Nova" },
  { name: "Exaltasamba", genre: "Samba & Pagode" },
  { name: "Ferrugem", genre: "Samba & Pagode" },
  { name: "Chico Buarque", genre: "MPB & Bossa Nova" },
  { name: "Gilberto Gil", genre: "MPB & Bossa Nova" },
  { name: "Tim Maia", genre: "MPB & Bossa Nova" },
  { name: "Seu Jorge", genre: "MPB & Bossa Nova" },
  { name: "Djavan", genre: "MPB & Bossa Nova" },
  { name: "Milton Nascimento", genre: "MPB & Bossa Nova" },
  { name: "Ney Matogrosso", genre: "MPB & Bossa Nova" },
  { name: "Alceu Valença", genre: "MPB & Bossa Nova" },
  { name: "Zé Ramalho", genre: "MPB & Bossa Nova" },
  { name: "Elis Regina", genre: "MPB & Bossa Nova" },
  { name: "Maria Bethânia", genre: "MPB & Bossa Nova" },
  { name: "Gal Costa", genre: "MPB & Bossa Nova" },
  { name: "Cassia Eller", genre: "MPB & Bossa Nova" },
  { name: "Sidney Magal", genre: "MPB & Bossa Nova" },
  { name: "Thiaguinho", genre: "Samba & Pagode" },
  { name: "Dilsinho", genre: "Samba & Pagode" },
  { name: "Mumuzinho", genre: "Samba & Pagode" },
  { name: "Fundo de Quintal", genre: "Samba & Pagode" },
  { name: "Alcione", genre: "Samba & Pagode" },
  { name: "Beth Carvalho", genre: "Samba & Pagode" },
  { name: "Diogo Nogueira", genre: "Samba & Pagode" },
  { name: "Martinho da Vila", genre: "Samba & Pagode" },
  { name: "Só Pra Contrariar", genre: "Samba & Pagode" },
  { name: "Jorge Vercillo", genre: "MPB & Bossa Nova" },
  { name: "Grupo Revelação", genre: "Samba & Pagode" },
  { name: "Nelson Gonçalves", genre: "MPB & Bossa Nova" },
  { name: "Guilherme Arantes", genre: "MPB & Bossa Nova" },
  { name: "Reginaldo Rossi", genre: "MPB & Bossa Nova" },
  { name: "Armandinho", genre: "MPB & Bossa Nova" },
  { name: "Belo", genre: "Samba & Pagode" },
  { name: "João Nogueira", genre: "Samba & Pagode" },
  { name: "Arlindo Cruz", genre: "Samba & Pagode" },
  { name: "Zeca Baleiro", genre: "MPB & Bossa Nova" },
  { name: "Lenine", genre: "MPB & Bossa Nova" },
  { name: "Zélia Duncan", genre: "MPB & Bossa Nova" },
  { name: "Cássia Eller", genre: "MPB & Bossa Nova" },
  { name: "Tribalistas", genre: "MPB & Bossa Nova" },
  { name: "Toquinho", genre: "MPB & Bossa Nova" },
  { name: "Vinicius de Moraes", genre: "MPB & Bossa Nova" },
  { name: "Tom Jobim", genre: "MPB & Bossa Nova" },
  { name: "Nara Leão", genre: "MPB & Bossa Nova" },
  { name: "Cartola", genre: "Samba & Pagode" },
  { name: "Luiz Gonzaga", genre: "Axé & Forró" },
  { name: "Dominguinhos", genre: "Axé & Forró" },
  { name: "Elba Ramalho", genre: "Axé & Forró" },
  { name: "Geraldo Azevedo", genre: "MPB & Bossa Nova" },
  { name: "Belchior", genre: "MPB & Bossa Nova" },
  { name: "Lô Borges", genre: "MPB & Bossa Nova" },
  { name: "Beto Guedes", genre: "MPB & Bossa Nova" },
  { name: "Flávio Venturini", genre: "MPB & Bossa Nova" },
  { name: "14 Bis", genre: "MPB & Bossa Nova" },
  { name: "Ivan Lins", genre: "MPB & Bossa Nova" },
  { name: "Gonzaguinha", genre: "MPB & Bossa Nova" },
  { name: "Moraes Moreira", genre: "MPB & Bossa Nova" },
  { name: "Pepeu Gomes", genre: "MPB & Bossa Nova" },
  { name: "Baby do Brasil", genre: "MPB & Bossa Nova" },
  { name: "Novos Baianos", genre: "MPB & Bossa Nova" },
  { name: "João Bosco", genre: "MPB & Bossa Nova" },
  { name: "Edu Lobo", genre: "MPB & Bossa Nova" },
  { name: "Wando", genre: "MPB & Bossa Nova" },
  { name: "Gilliard", genre: "MPB & Bossa Nova" },
  { name: "Moacyr Franco", genre: "MPB & Bossa Nova" },
  { name: "Agnaldo Rayol", genre: "MPB & Bossa Nova" },
  { name: "Agnaldo Timóteo", genre: "MPB & Bossa Nova" },
  { name: "Nelson Ned", genre: "MPB & Bossa Nova" },
  { name: "Waldick Soriano", genre: "MPB & Bossa Nova" },
  { name: "Evaldo Braga", genre: "MPB & Bossa Nova" },
  { name: "Odair José", genre: "MPB & Bossa Nova" },
  { name: "Peninha", genre: "MPB & Bossa Nova" },
  { name: "Rosana", genre: "Pop & Diversos" },
  { name: "Joanna", genre: "MPB & Bossa Nova" },
  { name: "Elymar Santos", genre: "MPB & Bossa Nova" },
  { name: "Jorge Aragão", genre: "Samba & Pagode" },
  { name: "Almir Guineto", genre: "Samba & Pagode" },
  { name: "Leci Brandão", genre: "Samba & Pagode" },
  { name: "Clara Nunes", genre: "Samba & Pagode" },
  { name: "Marlene", genre: "MPB & Bossa Nova" },
  { name: "Dalva de Oliveira", genre: "MPB & Bossa Nova" },
  { name: "Elza Soares", genre: "Samba & Pagode" },
  { name: "Os Trapalhões", genre: "Pop & Diversos" },
  { name: "Trem da Alegria", genre: "Pop & Diversos" },
  { name: "Balão Mágico", genre: "Pop & Diversos" },
  { name: "Xuxa", genre: "Pop & Diversos" },
  { name: "Angélica", genre: "Pop & Diversos" },
  { name: "Mara Maravilha", genre: "Pop & Diversos" },
  { name: "Jota Quest", genre: "Rock & Alternative" },
  { name: "Titãs", genre: "Rock & Alternative" },
  { name: "CPM 22", genre: "Rock & Alternative" },
  { name: "O Rappa", genre: "Rock & Alternative" },
  { name: "Paralamas do Sucesso", genre: "Rock & Alternative" },
  { name: "Engenheiros do Hawaii", genre: "Rock & Alternative" },
  { name: "Biquini Cavadão", genre: "Rock & Alternative" },
  { name: "Pitty", genre: "Rock & Alternative" },
  { name: "Rita Lee", genre: "Rock & Alternative" },
  { name: "Cazuza", genre: "Rock & Alternative" },
  { name: "Barão Vermelho", genre: "Rock & Alternative" },
  { name: "Mamonas Assassinas", genre: "Rock & Alternative" },
  { name: "Capital Inicial", genre: "Rock & Alternative" },
  { name: "Legião Urbana", genre: "Rock & Alternative" },
  { name: "Charlie Brown Jr.", genre: "Rock & Alternative" },
  { name: "Skank", genre: "Rock & Alternative" },
  { name: "Kid Abelha", genre: "Rock & Alternative" },
  { name: "Cidade Negra", genre: "Rock & Alternative" },
  { name: "Natiruts", genre: "Rock & Alternative" },
  { name: "Maneva", genre: "Rock & Alternative" },
  { name: "Planta e Raiz", genre: "Rock & Alternative" },
  { name: "Maskavo", genre: "Rock & Alternative" },
  { name: "Chimarruts", genre: "Rock & Alternative" },
  { name: "O Surto", genre: "Rock & Alternative" },
  { name: "Los Hermanos", genre: "Rock & Alternative" },
  { name: "Detonautas", genre: "Rock & Alternative" },
  { name: "NX Zero", genre: "Rock & Alternative" },
  { name: "Fresno", genre: "Rock & Alternative" },
  { name: "Strike", genre: "Rock & Alternative" },
  { name: "Hevo84", genre: "Rock & Alternative" },
  { name: "Gloria", genre: "Rock & Alternative" },
  { name: "Cine", genre: "Pop & Diversos" },
  { name: "Restart", genre: "Pop & Diversos" },
  { name: "Camisa de Vênus", genre: "Rock & Alternative" },
  { name: "RPM", genre: "Rock & Alternative" },
  { name: "Nenhum de Nós", genre: "Rock & Alternative" },
  { name: "Herva Doce", genre: "Rock & Alternative" },
  { name: "Rádio Táxi", genre: "Rock & Alternative" },
  { name: "Blitz", genre: "Rock & Alternative" },
  { name: "Lobão", genre: "Rock & Alternative" },
  { name: "Ultraje a Rigor", genre: "Rock & Alternative" },
  { name: "Plebe Rude", genre: "Rock & Alternative" },
  { name: "Raul Seixas", genre: "Rock & Alternative" },
  { name: "Marcelo D2", genre: "Rap & Hip-Hop" },
  { name: "Gabriel O Pensador", genre: "Rap & Hip-Hop" },
  { name: "Emicida", genre: "Rap & Hip-Hop" },
  { name: "Criolo", genre: "Rap & Hip-Hop" },
  { name: "Rael", genre: "Rap & Hip-Hop" },
  { name: "Pollo", genre: "Rap & Hip-Hop" },
  { name: "Projota", genre: "Rap & Hip-Hop" },
  { name: "Rashid", genre: "Rap & Hip-Hop" },
  { name: "Baco Exu do Blues", genre: "Rap & Hip-Hop" },
  { name: "Djonga", genre: "Rap & Hip-Hop" },
  { name: "Matuê", genre: "Rap & Hip-Hop" },
  { name: "Filipe Ret", genre: "Rap & Hip-Hop" },
  { name: "L7NNON", genre: "Rap & Hip-Hop" },
  { name: "Xamã", genre: "Rap & Hip-Hop" },
  { name: "Orochi", genre: "Rap & Hip-Hop" },
  { name: "BIN", genre: "Rap & Hip-Hop" },
  { name: "Teto", genre: "Rap & Hip-Hop" },
  { name: "WIU", genre: "Rap & Hip-Hop" },
  { name: "Kawe", genre: "Rap & Hip-Hop" },
  { name: "KayBlack", genre: "Rap & Hip-Hop" }
];

export const PLAYLISTS: Playlist[] = [
  {
    id: "disney",
    name: "Disney Songs",
    description: "Magical soundtracks and classic singalongs from your favorite movies.",
    coverColor: "from-blue-500 to-cyan-400",
    artists: [],
    codes: [
      "74-810-02", // Aladdin - A Whole New World
      "14-007-14", // Aladdin - Friend Like Me
      "14-044-89", // Beauty and the Beast - Be Our Guest
      "20-317-02", // Beauty and the Beast - Beauty and the Beast
      "99-287-15", // Beauty and the Beast - Something There
      "72-123-03", // Big Hero 6 - Immortality (closest to Immortal)
      "11-102-86", // Cinderella - A Dream Is a Wish Your Heart Makes
      "72-376-13", // Coco - Remember Me
      "68-911-05", // Dumbo - Baby Mine
      "14-028-35", // Encanto - We Don't Talk About Bruno
      "14-022-04", // Frozen - Do You Want to Build a Snowman
      "13-550-06", // Frozen - Let It Go
      "14-046-63", // Frozen - Love Is an Open Door
      "14-009-77", // Frozen II - Show Yourself
      "90-504-02", // Hercules - Go the Distance
      "15-228-09", // Moana - How Far I'll Go
      "99-926-16", // Moana - Shiny
      "14-045-68", // Mulan - I'll Make a Man Out of You
      "90-533-02", // Mulan - Reflection
      "68-930-07", // Pinocchio - Give a Little Whistle
      "68-930-03", // Pinocchio - I've Got No Strings
      "68-930-01", // Pinocchio - When You Wish Upon a Star
      "15-218-04", // Pocahontas - Colors of the Wind
      "68-930-05", // Snow White and the Seven Dwarfs - Heigh-Ho
      "68-930-09", // Snow White and the Seven Dwarfs - Someday My Prince Will Come
      "68-930-02", // Snow White and the Seven Dwarfs - Whistle While You Work
      "14-011-97", // Tangled - I See the Light
      "14-011-98", // Tangled - When Will My Life Begin
      "46-151-16", // Tarzan - You'll Be in My Heart
      "46-141-02", // The Lion King - Can You Feel the Love Tonight
      "46-141-01", // The Lion King - Circle of Life
      "74-871-07", // The Lion King - Hakuna Matata
      "99-519-10", // The Little Mermaid - Kiss the Girl
      "14-011-59", // The Little Mermaid - Part of Your World
      "14-009-16", // The Princess and the Frog - Dig a Little Deeper
      "98-907-34", // Theme Park Song - It's a small world
      "99-656-49", // Theme Park Song - Yo Ho
      "12-114-08", // Toy Story 2 - When She Loved Me
    ],
    songMetadata: {
      "11-102-86": "Cinderella",
      "74-810-02": "Aladdin",
      "14-044-89": "Beauty and the Beast",
      "20-317-02": "Beauty and the Beast",
      "68-911-05": "Dumbo",
      "46-141-02": "The Lion King",
      "46-141-01": "The Lion King",
      "15-218-04": "Pocahontas",
      "14-009-16": "The Princess and the Frog",
      "14-022-04": "Frozen",
      
      "14-007-14": "Aladdin",
      "68-930-07": "Pinocchio",
      "90-504-02": "Hercules",
      "74-871-07": "The Lion King",
      "68-930-05": "Snow White and the Seven Dwarfs",
      "15-228-09": "Moana",
      
      "14-011-97": "Tangled",
      "14-045-68": "Mulan",
      "68-930-03": "Pinocchio",
      "72-123-03": "Big Hero 6",
      "98-907-34": "Theme Park Song",
      "99-519-10": "The Little Mermaid",
      "13-550-06": "Frozen",
      "14-046-63": "Frozen",
      
      "14-011-59": "The Little Mermaid",
      
      "90-533-02": "Mulan",
      "72-376-13": "Coco",
      "99-926-16": "Moana",
      "14-009-77": "Frozen II",
      "68-930-09": "Snow White and the Seven Dwarfs",
      "99-287-15": "Beauty and the Beast",
      
      "14-028-35": "Encanto",
      "12-114-08": "Toy Story 2",
      "14-011-98": "Tangled",
      "68-930-01": "Pinocchio",
      "68-930-02": "Snow White and the Seven Dwarfs",
      "99-656-49": "Theme Park Song",
      "46-151-16": "Tarzan",
    }
  },
  {
    id: "naruto",
    name: "Naruto Openings",
    description: "Believe it! The most iconic anime openings and endings.",
    coverColor: "from-orange-500 to-amber-600",
    artists: [],
    codes: [
      // Original
      "99-005-09", // OP 1: ROCKS
      "99-878-96", // OP 2: Haruka Kanata (or 98-919-98)
      "99-861-23", // OP 3: Kanashimi (or 98-954-18)
      "99-879-52", // OP 4: GO!!! (or 98-855-58)
      "99-940-25", // OP 5: Seishun 
      "99-974-21", // OP 6: No Boy No Cry
      "98-958-49", // OP 7: Namikaze Satellite
      "99-879-53", // OP 8: Re:member
      "99-891-70", // OP 9: Yura Yura
      
      // Shippuden
      "99-892-66", // Shippuden OP 1: Hero's come back
      "99-868-46", // Shippuden OP 2: Distance
      "99-872-73", // Shippuden OP 3: Blue Bird 
      "99-877-25", // Shippuden OP 4: Closer
      "99-891-86", // Shippuden OP 5: Hotaru no Hikari
      "99-521-92", // Shippuden OP 6: Sign
      "99-887-28", // Shippuden OP 7: Tohmei Datta Sekai
      "99-892-62", // Shippuden OP 8: Diver
      "99-892-78", // Shippuden OP 9: Lovers
      "99-533-36", // Shippuden OP 10: Newsong
      "98-891-70", // Shippuden OP 12: Moshimo (closest we had)
    ],
    songMetadata: {
      "99-005-09": "Opening 1",
      "99-878-96": "Opening 2",
      "98-919-98": "Opening 2", // Alt version
      "99-861-23": "Opening 3",
      "98-954-18": "Opening 3", // Alt version
      "99-879-52": "Opening 4",
      "98-855-58": "Opening 4", // Alt version
      "99-940-25": "Opening 5",
      "99-974-21": "Opening 6",
      "98-958-49": "Opening 7",
      "99-879-53": "Opening 8",
      "98-940-63": "Opening 8", // Alt version
      "99-891-70": "Opening 9",
      "98-968-66": "Opening 9", // Alt version
      
      "99-892-66": "Shippuden OP 1",
      "98-971-57": "Shippuden OP 1", // Alt version
      "99-868-46": "Shippuden OP 2",
      "98-922-23": "Shippuden OP 2", // Alt version
      "99-872-73": "Shippuden OP 3",
      "98-928-31": "Shippuden OP 3", // Alt version
      "99-877-25": "Shippuden OP 4",
      "98-931-98": "Shippuden OP 4", // Alt version
      "99-891-86": "Shippuden OP 5",
      "98-936-50": "Shippuden OP 5", // Alt version
      "99-521-92": "Shippuden OP 6",
      "98-936-05": "Shippuden OP 6", // Alt version
      "99-887-28": "Shippuden OP 7",
      "98-941-04": "Shippuden OP 7", // Alt version
      "99-892-62": "Shippuden OP 8",
      "98-948-19": "Shippuden OP 8", // Alt version
      "99-892-78": "Shippuden OP 9",
      "98-902-77": "Shippuden OP 9", // Alt version
      "99-533-36": "Shippuden OP 10",
      "98-908-09": "Shippuden OP 10", // Alt version
      "98-891-70": "Shippuden OP 12", 
    }
  },
  {
    id: "br-hits",
    name: "Músicas Brasileiras",
    description: "Do axé ao funk, os maiores sucessos do Brasil.",
    coverColor: "from-green-500 to-yellow-500",
    artists: BRAZILIAN_ARTISTS.map(a => a.name),
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
