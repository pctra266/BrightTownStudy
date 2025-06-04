import api from "../../../api/api";
import {
  vi,
  describe,
  test,
  expect,
  beforeEach,
  type MockInstance,
} from "vitest";
import {
  getFlashcardSets,
  getFlashcardSetById,
  createFlashcardSet,
  updateFlashcardSet,
  deleteFlashcardSet,
} from "./flashcardService";
import type { FlashcardSet, FlashcardSetMeta } from "../types";

vi.mock("../../../api/api");

const mockedApi = api as unknown as {
  get: MockInstance;
  post: MockInstance;
  put: MockInstance;
  delete: MockInstance;
};

describe("flashcardService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch flashcard set meta list", async () => {
    const mockData: FlashcardSetMeta[] = [
      { id: "1", description: "Flashcard 1", name: "Flashcard One" },
      { id: "2", description: "Flashcard 2", name: "Flashcard Two" },
    ];

    mockedApi.get.mockResolvedValueOnce({ data: mockData });
    const result = await getFlashcardSets();
    expect(result).toEqual(mockData);
    expect(mockedApi.get).toHaveBeenCalledWith("/flashcardSets");
  });

  test("should fetch flashcard set by ID", async () => {
    const mockData: FlashcardSet = {
      id: "1",
      description: "Flashcard 1",
      name: "Flashcard One",
      flashcards: [
        { id: "1", question: "What is 2+2?", answer: "4" },
        { id: "2", question: "Capital of France?", answer: "Paris" },
      ],
    };

    mockedApi.get.mockResolvedValueOnce({ data: mockData });
    const result = await getFlashcardSetById("1");
    expect(result).toEqual(mockData);
    expect(mockedApi.get).toHaveBeenCalledWith("/flashcardSets/1");
  });

  test("should create a new flashcard set", async () => {
    const payload = {
      name: "New Set",
      description: "Description",
      flashcards: [],
    };

    const mockResponse: FlashcardSet = { ...payload, id: "123" };

    mockedApi.post.mockResolvedValueOnce({ data: mockResponse });
    const result = await createFlashcardSet(payload);
    expect(result).toEqual(mockResponse);
    expect(mockedApi.post).toHaveBeenCalledWith("/flashcardSets", payload);
  });

  test("should update a flashcard set", async () => {
    const updated = {
      name: "Updated Set",
      description: "Updated Desc",
      flashcards: [],
    };

    const mockResponse: FlashcardSet = { ...updated, id: "1" };

    mockedApi.put.mockResolvedValueOnce({ data: mockResponse });
    const result = await updateFlashcardSet("1", updated);
    expect(result).toEqual(mockResponse);
    expect(mockedApi.put).toHaveBeenCalledWith("/flashcardSets/1", updated);
  });

  test("should delete a flashcard set", async () => {
    mockedApi.delete.mockResolvedValueOnce(undefined);
    await deleteFlashcardSet("1");
    expect(mockedApi.delete).toHaveBeenCalledWith("/flashcardSets/1");
  });
});
