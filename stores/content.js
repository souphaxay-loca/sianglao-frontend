// stores/content.js
export const useContentStore = defineStore("content", {
  state: () => ({
    // Navigation content
    navigation: {
      main: "ໜ້າຫຼັກ", // "Main"
      about: "ກ່ຽວກັບພວກເຮົາ", // "About Us"
      contact: "ຕິດຕໍ່ພວກເຮົາ", // "Contact"
    },

    // Footer content
    footer: {
      copyright: "© 2025 SiangLao. ສະຫງວນລິຂະສິດທັງໝົດ.",
    },

    // Initial state content (will be used in InitialState component)
    initialState: {
      title: "Convert Lao Speech to Text",
      subtitle:
        "ຖອດຂໍ້ຄວາມຈາກສຽງບັນທຶກພາສາລາວເປັນຕົວໜັງສືໄດ້ຢ່າງຖືກຕ້ອງຊັດເຈນ ດ້ວຍເຕັກໂນໂລຊີປັນຍາປະດິດ (AI) ທີ່ກ້າວໜ້າຂອງພວກເຮົາ. ",
      keyMessage: "ກົດປຸ່ມໄມໂຄຣໂຟນເພື່ອເລີ່ມຕົ້ນ ຫຼື ອັບໂຫຼດສຽງບັນທຶກທີ່ມີຢູ່ຂອງທ່ານ",
      recordButton: "ເລີ່ມບັນທຶກ",
      uploadButton: "ອັບໂຫຼດ",
      uploadText: "ຫຼື ລາກຟາຍສຽງມາໃສ່ບ່ອນນີ້",
    },

    // Transcription interface content
    transcription: {
      timeRecorded: "ເວລາບັນທຶກ:",
      aiConfidence: "ຄວາມເຊື່ອໝັ້ນ:",
      placeholderText: "ລໍຖ້າການບັນທຶກສຽງ ຫຼື ການອັບໂຫຼດຟາຍ.",
      copyButton: "ກັອບປີ້ຂໍ້ຄວາມ",
      downloadButton: "ດາວໂຫຼດ",
      processingText: "ກຳລັງດຳເນີນການ...",
      processingSubtext: "ກຳລັງວິເຄາະສຽງ",
    },

    // Error messages 
    errors: {
      validation: {
        title: "ປະເພດຂອງຟາຍບໍ່ຖືກຕ້ອງ",
        subtitle: "ຟາຍນີ້ບໍ່ສາມາດໃຊ້ໄດ້ ກະລຸນາເລືອກຟາຍໃໝ່",
        message:
          "ປະເພດຂອງຟາຍບໍ່ຖືກຕ້ອງ. ກະລຸນາເລືອກຟາຍໃໝ່",
      },
      processing: {
        title: "Processing Failed",
        subtitle: "ການປະມວນຜົນລົ້ມເຫຼວ ກະລຸນາລອງໃໝ່ ຫຼື ກວດສອບຄຸນນະພາບສຽງ",
        message:
          "The audio could not be processed. This might be due to poor audio quality or technical issues.",
      },
    },
  }),

  getters: {
    // Helper getters for easy access
    getNavigationLabel: (state) => (key) => {
      return state.navigation[key] || key;
    },

    getCopyrightText: (state) => state.footer.copyright,

    getInitialStateContent: (state) => state.initialState,

    getTranscriptionContent: (state) => state.transcription,

    getErrorContent: (state) => (type) => state.errors[type]
  },

  actions: {
    // Future: methods to update content dynamically if needed
    updateContent(section, key, value) {
      if (this[section] && this[section][key] !== undefined) {
        this[section][key] = value;
      }
    },
  },
});
