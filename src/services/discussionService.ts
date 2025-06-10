import api from '../api/api';

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

    getAllDiscussions: async (): Promise<Discussion[]> => {
        const response = await api.get('/discussions');
        return response.data.map((discussion: any) => ({
            ...discussion,
            views: discussion.views ?? 0,
            viewedBy: discussion.viewedBy ?? []
        }));
    },


    getDiscussionById: async (id: string): Promise<Discussion> => {
        const response = await api.get(`/discussions/${id}`);
        const discussion = response.data;


        return {
            ...discussion,
            views: discussion.views ?? 0,
            viewedBy: discussion.viewedBy ?? []
        };
    },


    generateNextDiscussionId: async (): Promise<string> => {
        const discussions = await discussionService.getAllDiscussions();
        const maxId = discussions.reduce((max, discussion) => {
            const currentId = parseInt(discussion.id);
            return currentId > max ? currentId : max;
        }, 0);
        return (maxId + 1).toString();
    },


    generateNextAnswerId: async (discussionId: string): Promise<string> => {
        const discussion = await discussionService.getDiscussionById(discussionId);
        const maxId = discussion.answers.reduce((max, answer) => {
            const currentId = parseInt(answer.id);
            return currentId > max ? currentId : max;
        }, 0);
        return (maxId + 1).toString();
    },


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


    trackView: async (discussionId: string, userId: string): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);




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


    deleteDiscussion: async (id: string): Promise<void> => {
        await api.delete(`/discussions/${id}`);
    },


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


    voteOnDiscussion: async (discussionId: string, data: VoteData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        const currentUserVote = discussion.userVotes[data.userId];
        let newUpvotes = discussion.upvotes;
        let newDownvotes = discussion.downvotes;
        const newUserVotes = { ...discussion.userVotes };


        if (currentUserVote === 'upvote') {
            newUpvotes--;
        } else if (currentUserVote === 'downvote') {
            newDownvotes--;
        }


        if (currentUserVote !== data.voteType) {
            if (data.voteType === 'upvote') {
                newUpvotes++;
            } else {
                newDownvotes++;
            }
            newUserVotes[data.userId] = data.voteType;
        } else {

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


    voteOnAnswer: async (discussionId: string, answerId: string, data: VoteData): Promise<Discussion> => {
        const discussion = await discussionService.getDiscussionById(discussionId);

        const updatedAnswers = discussion.answers.map(answer => {
            if (answer.id === answerId) {
                const currentUserVote = answer.userVotes[data.userId];
                let newUpvotes = answer.upvotes;
                let newDownvotes = answer.downvotes;
                const newUserVotes = { ...answer.userVotes };


                if (currentUserVote === 'upvote') {
                    newUpvotes--;
                } else if (currentUserVote === 'downvote') {
                    newDownvotes--;
                }


                if (currentUserVote !== data.voteType) {
                    if (data.voteType === 'upvote') {
                        newUpvotes++;
                    } else {
                        newDownvotes++;
                    }
                    newUserVotes[data.userId] = data.voteType;
                } else {

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