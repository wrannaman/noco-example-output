const boot = () => {

      setTimeout(async () => {
        try {
          const apiKey = global.DB.models.apiKey;
          const existing = await apiKey.findOne({ where: { key: "HXWWPFD-TCKM4NX-K6D5CYM-YWS083Z" } });
          if (!existing) {
            apiKey.create({ key: "HXWWPFD-TCKM4NX-K6D5CYM-YWS083Z" })
          }
          console.log('bootstrapped api key!');
        } catch (e) {
          setTimeout(() => boot(), 3000)
        }
      }, 3000);
  };
  boot();