import { BlogPost } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      // Don't set Content-Type for FormData - let the browser set it with boundary
      const headers: HeadersInit = {};
      if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          ...headers,
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
    

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'An error occurred' };
    }

   
  }

  // Blog Posts
  async getBlogPosts(params?: { category?: string; search?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.category && params.category !== 'All') queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    return this.request<{ posts: BlogPost[]; totalPages: number; currentPage: number; total: number }>(
      `/posts${queryString ? `?${queryString}` : ''}`
    );
  }

  async getBlogPost(id: string) {
    return this.request<BlogPost>(`/posts/${id}`);
  }

  async getAdminBlogPosts() {
    return this.request<BlogPost[]>('/posts/admin');
  }

  async createBlogPost(formData: FormData) {
    return this.request<BlogPost>('/posts', {
      method: 'POST',
      body: formData,
      // No Content-Type header for FormData - let browser set it
    });
  }

  async updateBlogPost(id: string, formData: FormData) {
    return this.request<BlogPost>(`/posts/${id}`, {
      method: 'PUT',
      body: formData,
      // No Content-Type header for FormData - let browser set it
    });
  }

  async deleteBlogPost(id: string) {
    return this.request<{ message: string }>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Newsletter
  async subscribeToNewsletter(email: string) {
    return this.request<{ message: string }>('/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Get featured posts (first few published posts)
  async getFeaturedPosts(limit: number = 5) {
    return this.request<{ posts: BlogPost[]; totalPages: number; currentPage: number; total: number }>(
      `/posts?limit=${limit}&page=1`
    );
  }

  // Add this method with the other API methods:
  async getSubscribers() {
    return this.request<any[]>('/subscribe/admin');
  }

  // Add these methods to your ApiService class
    async sendNewsletter(data: { subject: string; content: string }) {
    return this.request<{ success: boolean; message: string; result: any }>('/newsletter/send', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    }

    async getNewsletterStats() {
        return this.request<{
            totalSubscribers: number;
            activeSubscribers: number;
            inactiveSubscribers: number;
        }>('/newsletter/stats');
    }

    // Add to ApiService class
    async getComments(postId: string) {
      return this.request<any[]>(`/comments/post/${postId}`);
    }

    async createComment(commentData: {
      postId: string;
      author: string;
      email: string;
      content: string;
    }) {
      return this.request<{ success: boolean; message: string; comment: any }>('/comments', {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
    }

    // Add to ApiService class
    async getAdminComments(status: 'pending' | 'approved') {
      return this.request<{
        comments: any[];
        totalPages: number;
        currentPage: number;
        total: number;
      }>(`/comments/admin?status=${status}`);
    }

    async approveComment(commentId: string) {
      return this.request<{ success: boolean; message: string; comment: any }>(
        `/comments/${commentId}/approve`,
        { method: 'PATCH' }
      );
    }

    async deleteComment(commentId: string) {
      return this.request<{ success: boolean; message: string }>(
        `/comments/${commentId}`,
        { method: 'DELETE' }
      );
    }

    async addCommentReply(commentId: string, content: string) {
      return this.request<{ success: boolean; message: string; reply: any }>(
        `/comments/${commentId}/reply`,
        {
          method: 'POST',
          body: JSON.stringify({ content }),
        }
      );
    }


}

export const apiService = new ApiService();

export {};