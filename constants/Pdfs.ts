interface Section {
  title: string;
  subPdfs: { title: string; path: string; cover?: string }[];
}

export const PDF_SECTIONS: Section[] = [
  {
    title: "Section 1",
    subPdfs: [
      {
        title: "ICT",
        path: "https://drive.google.com/file/d/1dkBlTLcbw8uVoqj-3zmgJaE6do9g1G8X/view?usp=sharing",
        cover: require("../assets/covers/12/ict.png"),
      },
      {
        title: "Chemistry",
        path: "https://drive.google.com/file/d/1dkBlTLcbw8uVoqj-3zmgJaE6do9g1G8X/view?usp=sharing",
        cover: require("../assets/covers/12/agri.png"),
      },
    ],
  },
  {
    title: "Section 2",
    subPdfs: [
      {
        title: "Biology",
        path: "https://drive.google.com/file/d/1dkBlTLcbw8uVoqj-3zmgJaE6do9g1G8X/view?usp=sharing",
        cover: require("../assets/covers/12/agri.png"),
      },
      {
        title: "Agri",
        path: "https://drive.google.com/file/d/1dkBlTLcbw8uVoqj-3zmgJaE6do9g1G8X/view?usp=sharing",
        cover: require("../assets/covers/12/agri.png"),
      },
    ],
  },
];
