import { HAPStatus, IsKnownHAPStatusError } from "./HAPServer";

describe("HAPServer", () => {
  describe(IsKnownHAPStatusError, () => {
    it("should approve all defined error codes", () => {
      // @ts-expect-error: forceConsistentCasingInFileNames compiler option
      const errorValues = Object.values(HAPStatus)
        .filter(error => typeof error === "number") // .values will actually include both the enum values and enum names
        .filter(error => error !== 0); // filter out HAPStatus.SUCCESS

      for (const error of errorValues) {
        // @ts-expect-error: type mismatch
        const result = IsKnownHAPStatusError(error);
        if (!result) {
          fail("IsKnownHAPStatusError does not return true for error code " + error);
        }
      }
    });

    it("should reject non defined error codes", () => {
      expect(IsKnownHAPStatusError(23)).toBe(false);
      expect(IsKnownHAPStatusError(-3)).toBe(false);
      expect(IsKnownHAPStatusError(-72037)).toBe(false);
      expect(IsKnownHAPStatusError(HAPStatus.SUCCESS)).toBe(false);
    });

    it("should reject invalid user input", () => {
      // @ts-expect-error: deliberate illegal input
      expect(IsKnownHAPStatusError("asdjw")).toBe(false);
      // @ts-expect-error: deliberate illegal input
      expect(IsKnownHAPStatusError({ "key": "value" })).toBe(false);
      // @ts-expect-error: deliberate illegal input
      expect(IsKnownHAPStatusError([])).toBe(false);
    });
  });
});
