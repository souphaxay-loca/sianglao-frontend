// stores/content.js
export const useContentStore = defineStore('content', {
    state: () => ({
      // Navigation content
      navigation: {
        main: "ໜ້າຫຼັກ",           // "Main" 
        about: "ກ່ຽວກັບພວກເຮົາ",    // "About Us"
        contact: "ຕິດຕໍ່ພວກເຮົາ"          // "Contact"
      },
      
      // Footer content
      footer: {
        copyright: "© 2025 SiangLao. ສະຫງວນລິຂະສິດທັງໝົດ."
      },
      
      // Initial state content (will be used in InitialState component)
      initialState: {
        title: "Convert Lao Speech to Text",
        subtitle: "ຖອດຂໍ້ຄວາມຈາກສຽງບັນທຶກພາສາລາວເປັນຕົວໜັງສືໄດ້ຢ່າງຖືກຕ້ອງຊັດເຈນ ດ້ວຍເຕັກໂນໂລຊີປັນຍາປະດິດ (AI) ທີ່ກ້າວໜ້າຂອງພວກເຮົາ. ",
        recordButton: "ເລີ່ມບັນທຶກ",
        uploadButton: "ອັບໂຫຼດ",
        uploadText: "ຫຼື ລາກຟາຍສຽງມາໃສ່ບ່ອນນີ້"
      },
      
      // Transcription interface content
      transcription: {
        timeRecorded: "ເວລາບັນທຶກ:",
        aiConfidence: "ຄວາມຊັດເຈນ:",
        placeholderText: "ລໍຖ້າການບັນທຶກສຽງ ຫຼື ການອັບໂຫຼດຟາຍ.",
        copyButton: "ກັອບປີ້ຂໍ້ຄວາມ",
        downloadButton: "ດາວໂຫຼດ",
        processingText: "ກຳລັງດຳເນີນການ...",
        processingSubtext: "ກຳລັງວິເຄາະສຽງ"
      },
      
      // Error messages (for future use)
      errors: {
        fileNotSupported: "ໄຟລ໌ບໍ່ຮອງຮັບ",
        processingFailed: "ການດຳເນີນການລົ້ມເຫຼວ",
        networkError: "ມີບັນຫາການເຊື່ອມຕໍ່"
      }
    }),
  
    getters: {
      // Helper getters for easy access
      getNavigationLabel: (state) => (key) => {
        return state.navigation[key] || key
      },
      
      getCopyrightText: (state) => state.footer.copyright,
      
      getInitialStateContent: (state) => state.initialState,
      
      getTranscriptionContent: (state) => state.transcription
    },
  
    actions: {
      // Future: methods to update content dynamically if needed
      updateContent(section, key, value) {
        if (this[section] && this[section][key] !== undefined) {
          this[section][key] = value
        }
      }
    }
  })