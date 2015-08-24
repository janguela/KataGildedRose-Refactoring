describe("Gilded Rose,", function() {

  describe("products", function() {

    it("have a name", function() {
      items = [ new Item("Crafted beer", 0, 0) ];
      update_quality();
      expect(items[0].name).toEqual("Crafted beer");
    });
  });
});
