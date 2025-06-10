import api from '../../../api/api';

export interface Answer {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string | null;
    isEdited: boolean;
    upvotes: number;
    downvotes: number;
    score: number;
    userVotes: { [userId: string]: 'upvote' | 'downvote' };
}

export interface Discussion {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string | null;
    isEdited: boolean;
    upvotes: number;
    downvotes: number;
    score: number;
    userVotes: { [userId: string]: 'upvote' | 'downvote' };
    views: number;
    viewedBy: string[];
    answers: Answer[];
}

export interface CreateDiscussionData {
    title: string;
    content: string;
    authorId: string;
    authorName: string;
}

export interface UpdateDiscussionData {
    title: string;
    content: string;
}

export interface CreateAnswerData {
    content: string;
    authorId: string;
    authorName: string;
    discussionId: string;
}

export interface UpdateAnswerData {
    content: string;
}

export interface VoteData {
    userId: string;
    voteType: 'upvote' | 'downvote';
}

export const discussionService = {
    // Get all discussions
    getAllDiscussions: async (): Promise<Discussion[]> => {
        const response = await api.get('/discussions');
        return response.data.map((discussion: any) => ({
            ...discussion,
            views: discussion.views ?? 0,
            viewedBy: discussion.viewedBy ?? []
        }));
    },

    // Get discussion by ID
    getDiscussionById: async (id: string): Promise<Discussion> => {
        const response = await api.get(`/discussions/${id}`);
        const discussion = response.data;

        // Ensure view tracking fields exist for legacy discussions
        return {
            ...discussion,
            views: discussion.views ?? 0,
            viewedBy: discussion.viewedBy ?? []
        };
    },

    // Generate next discussion ID
    generateNextDiscussionId: async (): Promise<string> => {
        const discussions = await discussionService.getAllDiscussions();
        const maxId = discussions.reduce((max, discussion) => {
            const currentId = parseInt(discussion.id);
            return currentId > max ? currentId : max;
        }, 0);
        return (maxId + 1).toString();
    },

    // Generate next answer ID for a discussion
    generateNextAnswerId: async (discussionId: string): Promise<string> => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const maxId = discussion.answers.reduce((max, answer) => {
            const currentId = parseInt(answer.id);
            return currentId > max ? currentId : max;
        }, 0);
        return (maxId + 1).toString();
    },

    // Create new discussion
    createDiscussion: async (data: CreateDiscussionData): Promise<Discussion> => {
        const newId = await discussionService.generateNextDiscussionId();

        const newDiscussion = {
            ...data,
            id: newId,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            isEdited: false,
            upvotes: 0,
            downvotes: 0,
            score: 0,
            userVotes: {},
            views: 0,
            viewedBy: [],
            answers: []
        };

        const response = await api.post('/discussions', newDiscussion);
        return response.data;
    },

    // Track view for discussion
    trackView: async (discussionId: string, userId: string): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        // Don't track view if:
        // 1. User is the author
        // 2. User has already viewed this discussion
        if (discussion.authorId === userId || discussion.viewedBy.includes(userId)) {
            return discussion;
        }

        const updatedDiscussion = {
            ...discussion,
            views: discussion.views + 1,
            viewedBy: [...discussion.viewedBy, userId]
        };

        const response = await api.put(`/discussions/${discussionId}`, updatedDiscussion);
        return response.data;
    },

    // Update discussion
    updateDiscussion: async (id: string, data: UpdateDiscussionData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(id);

        const updatedDiscussion = {
            ...discussion,
            title: data.title,
            content: data.content,
            updatedAt: new Date().toISOString(),
            isEdited: true
        };

        const response = await api.put(`/discussions/${id}`, updatedDiscussion);
        return response.data;
    },

    // Delete discussion
    deleteDiscussion: async (id: string): Promise<void> => {
        await api.delete(`/discussions/${id}`);
    },

    // Add answer to discussion
    addAnswer: async (data: CreateAnswerData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(data.discussionId);
        const newAnswerId = await discussionService.generateNextAnswerId(data.discussionId);

        const newAnswer: Answer = {
            id: newAnswerId,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            isEdited: false,
            upvotes: 0,
            downvotes: 0,
            score: 0,
            userVotes: {}
        };

        const updatedDiscussion = {
            ...discussion,
            answers: [...discussion.answers, newAnswer]
        };

        const response = await api.put(`/discussions/${data.discussionId}`, updatedDiscussion);
        return response.data;
    },

    // Update answer
    updateAnswer: async (discussionId: string, answerId: string, data: UpdateAnswerData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        const updatedAnswers = discussion.answers.map(answer =>
            answer.id === answerId
                ? {
                    ...answer,
                    content: data.content,
                    updatedAt: new Date().toISOString(),
                    isEdited: true
                }
                : answer
        );

        const updatedDiscussion = {
            ...discussion,
            answers: updatedAnswers
        };

        const response = await api.put(`/discussions/${discussionId}`, updatedDiscussion);
        return response.data;
    },

    // Delete answer
    deleteAnswer: async (discussionId: string, answerId: string): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        const updatedAnswers = discussion.answers.filter(answer => answer.id !== answerId);

        const updatedDiscussion = {
            ...discussion,
            answers: updatedAnswers
        };

        const response = await api.put(`/discussions/${discussionId}`, updatedDiscussion);
        return response.data;
    },

    // Vote on discussion
    voteOnDiscussion: async (discussionId: string, data: VoteData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        const currentUserVote = discussion.userVotes[data.userId];
        let newUpvotes = discussion.upvotes;
        let newDownvotes = discussion.downvotes;
        const newUserVotes = { ...discussion.userVotes };

        // Remove previous vote if exists
        if (currentUserVote === 'upvote') {
            newUpvotes--;
        } else if (currentUserVote === 'downvote') {
            newDownvotes--;
        }

        // Apply new vote if different from current
        if (currentUserVote !== data.voteType) {
            if (data.voteType === 'upvote') {
                newUpvotes++;
            } else {
                newDownvotes++;
            }
            newUserVotes[data.userId] = data.voteType;
        } else {
            // Remove vote if clicking same button
            delete newUserVotes[data.userId];
        }

        const updatedDiscussion = {
            ...discussion,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            score: newUpvotes - newDownvotes,
            userVotes: newUserVotes
        };

        const response = await api.put(`/discussions/${discussionId}`, updatedDiscussion);
        return response.data;
    },

    // Vote on answer
    voteOnAnswer: async (discussionId: string, answerId: string, data: VoteData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        const updatedAnswers = discussion.answers.map(answer => {
            if (answer.id === answerId) {
                const currentUserVote = answer.userVotes[data.userId];
                let newUpvotes = answer.upvotes;
                let newDownvotes = answer.downvotes;
                const newUserVotes = { ...answer.userVotes };

                // Remove previous vote if exists
                if (currentUserVote === 'upvote') {
                    newUpvotes--;
                } else if (currentUserVote === 'downvote') {
                    newDownvotes--;
                }

                // Apply new vote if different from current
                if (currentUserVote !== data.voteType) {
                    if (data.voteType === 'upvote') {
                        newUpvotes++;
                    } else {
                        newDownvotes++;
                    }
                    newUserVotes[data.userId] = data.voteType;
                } else {
                    // Remove vote if clicking same button
                    delete newUserVotes[data.userId];
                }

                return {
                    ...answer,
                    upvotes: newUpvotes,
                    downvotes: newDownvotes,
                    score: newUpvotes - newDownvotes,
                    userVotes: newUserVotes
                };
            }
            return answer;
        });

        const updatedDiscussion = {
            ...discussion,
            answers: updatedAnswers
        };

        const response = await api.put(`/discussions/${discussionId}`, updatedDiscussion);
        return response.data;
    }
};

