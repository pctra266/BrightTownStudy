import api from "../../../api/api";
import { vi, type MockInstance } from 'vitest';
import {
  getAllFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "./flashcardService";
import type { FlashcardType } from "../types";

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

  test("getAllFlashcards returns data", async () => {
    const mockData: FlashcardType[] = [
      { id: "1", question: "Q1", answer: "A1" },
      { id: "2", question: "Q2", answer: "A2" },
    ];
    mockedApi.get.mockResolvedValue({ data: mockData });
    const result = await getAllFlashcards();
    expect(mockedApi.get).toHaveBeenCalledWith("/flashcards");
    expect(result).toEqual(mockData);
  });

  test("getFlashcardById returns data", async () => {
    const mockData: FlashcardType = { id: "1", question: "Q1", answer: "A1" };
    mockedApi.get.mockResolvedValue({ data: mockData });
    const result = await getFlashcardById("1");
    expect(mockedApi.get).toHaveBeenCalledWith("/flashcards/1");
    expect(result).toEqual(mockData);
  });
    test("createFlashcard creates a new flashcard", async () => {
        const mockData: Omit<FlashcardType, 'id'> = { question: "Q1", answer: "A1" };
        const createdData: FlashcardType = { id: "1", ...mockData };
        mockedApi.post.mockResolvedValue({ data: createdData });
        const result = await createFlashcard(mockData);
        expect(mockedApi.post).toHaveBeenCalledWith("/flashcards", mockData);
        expect(result).toEqual(createdData);
    });
    test("updateFlashcard updates an existing flashcard", async () => {
        const mockData: Omit<FlashcardType, 'id'> = { question: "Q1", answer: "A1" };
        const updatedData: FlashcardType = { id: "1", ...mockData };
        mockedApi.put.mockResolvedValue({ data: updatedData });
        const result = await updateFlashcard("1", mockData);
        expect(mockedApi.put).toHaveBeenCalledWith("/flashcards/1", mockData);
        expect(result).toEqual(updatedData);
    });
  test("deleteFlashcard deletes a flashcard", async () => {
    mockedApi.delete.mockResolvedValue({});
    await deleteFlashcard("1");
    expect(mockedApi.delete).toHaveBeenCalledWith("/flashcards/1");
  });
});
