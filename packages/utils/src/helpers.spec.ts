process.env.ROW_PER_PAGE_LIMIT = "3";
import { PaginationedResponse } from "./helpers";

describe("Testing Utils Helpers", () => {
  it("Should return empty items with hasMore false, cursor -1", () => {
    let mockedArray = [];
    let paginatedResponse = PaginationedResponse(mockedArray);
    expect(paginatedResponse.cursor).toBe(-1);
    expect(paginatedResponse.hasMore).toBe(false);
    expect(paginatedResponse.items.length).toBe(0);
  });
  it("Should return items in the array with hasMore true and cursor last item id", () => {
    let mockedArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    let paginatedResponse = PaginationedResponse(mockedArray);
    expect(paginatedResponse.cursor).toBe(3);
    expect(paginatedResponse.hasMore).toBe(true);
    expect(paginatedResponse.items).toBe(mockedArray);
  });
});
