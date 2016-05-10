var expect = chai.expect;

describe("Tests", function() {

  describe("sayHello", function() {
    it("should say hello", function() {
      var bonitaLib = new BonitaLib();
      expect(bonitaLib.sayHello("Fabrice")).to.equal("Hello : Fabrice");
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
  });
});
