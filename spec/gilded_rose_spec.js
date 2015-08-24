describe("Gilded Rose,", function() {

  describe("a product", function() {
    it("has a name", function() {
      var name = "Crafted beer";
      var item = new Item(name, 0, 0);
      expect(item.name).toEqual(name);
    });

    it("has a SellIn value", function() {
      var sellInValue = 10;
      var item = new Item("", sellInValue, 0);
      expect(item.sell_in).toEqual(sellInValue);
    });

    it("has a Quality value", function() {
      var qualityValue = 20;
      var item = new Item("", 0, qualityValue);
      expect(item.quality).toEqual(qualityValue);
    });
  });
});
