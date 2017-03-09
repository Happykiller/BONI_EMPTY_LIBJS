var expect = chai.expect;

  describe("Tests", function() {

  describe("sayHello", function() {
    it("should say hello", function() {
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.sayHello("Fabrice")).to.equal("Hello : Fabrice");
    });
  })

  describe("pad", function(){
    it("pad 2", function(){
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.pad(2, 2)).to.equal("02");
    });
    it("pad 4", function(){
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.pad(42, 4)).to.equal("0042");
    });
  })

  describe("dateFormat", function(){
    it("format basic", function(){
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.dateFormat(new Date("2016-08-01"), "dd/mm/yyyy")).to.equal("01/08/2016");
    });
  })

  describe("clone", function(){
    it("merge array change default", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [{
          a : "",
          b : ""
        }],
      };

      var cloneDefault = bonitaLib.clone(objDefault);

      objDefault.a[0].a = "a0a";

      expect(cloneDefault.a[0].a).to.equal("");
    });
  }),

  describe("mergeRecursive", function() {
    it("merge simple", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : 1,
        b : 2,
        c : {
          ca : 1,
          cb : null,
          cc : {
            cca : 100,
            ccb : 200
          }
        },
        d : null
      };

      var objInput = {
        a : 10,
        c : {
          ca : 10,
          cc : {
            cca : 101,
            ccb : 202
          }
        },
        d : 42,
        e : "e"
      };

      var expected = {
        a : 10,
        b : 2,
        c : {
          ca : 10,
          cb : null,
          cc : {
            cca : 101,
            ccb : 202
          }
        },
        d : 42,
        e : "e"
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });

    it("merge array", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [
          {
            a : "",
            b : ""
          }
        ],
        b : [],
        c : [
          {
            a : "",
            b : [
              {
                a : "",
                b : "",
              }
            ]
          }
        ]
      };

      var objInput = {
        a : [
          {
            a : "",
            b : ""
          },
          {
            a : "fba"
          }
        ],
        c : [
          {
            a : "",
            b : [
              {
                b : "hbb"
              }
            ]
          }
        ]
      };

      var expected = {
        a : [
          {
            a : "",
            b : ""
          },
          {
            a : "fba",
            b : ""
          }
        ],
        b : [],
        c : [
          {
            a : "",
            b : [
              {
                a : "",
                b : "hbb"
              }
            ]
          }
        ]
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });

    it("merge array more", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [],
      };

      var objInput = {
        a : [
          {
            a : "aa",
            b : "ab"
          }
        ]
      };

      var expected = {
        a : [
          {
            a : "aa",
            b : "ab"
          }
        ]
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });

    it("merge array option", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [
          {
            a : "",
            b : ""
          }
        ],
      };

      var objInput = {
        a : [
          {
            a : "a0a",
            c : "a0c"
          }
        ]
      };

      var expected = {
        a : [
          {
            a : "a0a",
            b : "",
            c : "a0c"
          }
        ]
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });

    it("merge array option 2", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [
          {
            a : "",
            b : ""
          }
        ],
      };

      var objInput = {
        a : []
      };

      var expected = {
        a : []
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });

    it("merge array more 3", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = { "pocContract": { "inputString": "", "listObject": [ { "input2": "" } ], "inputInt": [] } };

      var objInput =  { "pocContract": { "inputString": "dsfdf", "listObject": [ { "input1": false, "input2": "dfdf" }, { "input1": false } ], "inputInt": [] } };

      var expected =  { "pocContract": { "inputString": "dsfdf", "listObject": [ { "input2": "dfdf", "input1": false }, { "input2": "", "input1": false } ], "inputInt": [] } };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });

    it("merge array int", function() {
      var bonitaLib = new BonitaLib();

      var objDefault = {
        a : [],
      };

      var objInput = {
        a : [1,2]
      };

      var expected = {
        a : [1,2]
      };

      var objReturn = bonitaLib.mergeRecursive({"default":objDefault,"source":objInput});

      expect(objReturn).to.deep.equal(expected);
    });
  }),

  describe("formatterJsonToHtml", function() {
    it("formatterJsonToHtml 1", function() {
      var bonitaLib = new BonitaLib();

      var strReturn = bonitaLib.formatterJsonToHtml(4);

      var strAttemp = '<span style="color:#2980b9;">4</span>';

      expect(strReturn).to.equal(strAttemp);
    });


    it("formatterJsonToHtml 2", function() {
      var bonitaLib = new BonitaLib();

      var strReturn = bonitaLib.formatterJsonToHtml(['4',5]);

      var strAttemp = 'Array[2] <ul><li><span style="color:#9b59b6;">0:</span> <span style="color:#c0392b;">"4"</span></li><li><span style="color:#9b59b6;">1:</span> <span style="color:#2980b9;">5</span></li></ul>';

      expect(strReturn).to.equal(strAttemp);
    });


    it("formatterJsonToHtml 3", function() {
      var bonitaLib = new BonitaLib();

      var strReturn = bonitaLib.formatterJsonToHtml({"name":"fabrice", "age": 12});

      var strAttemp = 'Object{2} <ul><li><span style="color:#9b59b6;">name:</span> <span style="color:#c0392b;">"fabrice"</span></li><li><span style="color:#9b59b6;">age:</span> <span style="color:#2980b9;">12</span></li></ul>';

      expect(strReturn).to.equal(strAttemp);
    });
  });

  describe( "order", function() {
    it("order1", function() {
      var bonitaLib = new BonitaLib();

      var inputs = [2, 1, 3];

      var response = bonitaLib.order({
        collection: inputs,
        compare: function(elt1, elt2){
                if(elt1 > elt2){
                    return 1;
                }else if(elt1 < elt2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });

        var expected = [1, 2, 3];

        expect(response).to.deep.equal(expected);
      }
    );
  });

  describe( "removeDiacritics", function() {
    it("removeDiacritics1", function() {
        var bonitaLib = new BonitaLib();

        var input = "L'avantage d'utiliser le lorem ipsum est bien évidemment de pouvoir créer des maquettes ou de remplir un site internet de contenus qui présentent un rendu s'approchant un maximum du rendu final. \n Par défaut lorem ipsum ne contient pas d'accent ni de caractères spéciaux contrairement à la langue française qui en contient beaucoup. C'est sur ce critère que nous proposons une solution avec cet outil qui générant du faux-texte lorem ipsum mais avec en plus, des caractères spéciaux tel que les accents ou certains symboles utiles pour la langue française. \n L'utilisation du lorem standard est facile d’utilisation mais lorsque le futur client utilisera votre logiciel il se peut que certains caractères spéciaux ou qu'un accent ne soient pas codés correctement. \n Cette page a pour but donc de pouvoir perdre le moins de temps possible et donc de tester directement si tous les encodages de base de donnée ou des sites sont les bons de plus il permet de récuperer un code css avec le texte formaté !";

        var response = bonitaLib.removeDiacritics({str:input});

        var expected = "L'avantage d'utiliser le lorem ipsum est bien evidemment de pouvoir creer des maquettes ou de remplir un site internet de contenus qui presentent un rendu s'approchant un maximum du rendu final. \n Par defaut lorem ipsum ne contient pas d'accent ni de caracteres speciaux contrairement a la langue francaise qui en contient beaucoup. C'est sur ce critere que nous proposons une solution avec cet outil qui generant du faux-texte lorem ipsum mais avec en plus, des caracteres speciaux tel que les accents ou certains symboles utiles pour la langue francaise. \n L'utilisation du lorem standard est facile d’utilisation mais lorsque le futur client utilisera votre logiciel il se peut que certains caracteres speciaux ou qu'un accent ne soient pas codes correctement. \n Cette page a pour but donc de pouvoir perdre le moins de temps possible et donc de tester directement si tous les encodages de base de donnee ou des sites sont les bons de plus il permet de recuperer un code css avec le texte formate !";

        expect(response).to.equal(expected);
      }
    );
  });
});
