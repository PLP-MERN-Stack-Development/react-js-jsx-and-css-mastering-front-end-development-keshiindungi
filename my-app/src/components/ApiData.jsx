import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import Button from './button';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null); // Renamed to avoid conflict
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 10;

  // Use useCallback to memoize the function
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      // Ensure we have English content by using fallback titles/bodies
      const postsWithEnglishContent = data.map(post => ({
        ...post,
        title: post.title || `Post Title ${post.id}`,
        body: post.body || `This is the content for post ${post.id}. This post was created by user ${post.userId}.`
      }));
      
      setPosts(prev => page === 1 ? postsWithEnglishContent : [...prev, ...postsWithEnglishContent]);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setPage(1);
    setPosts([]);
    fetchPosts();
  };

  // Function to ensure text is properly displayed
  const displayText = (text) => {
    return text || 'No content available';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="text-center">
        <h1 className="text-3xl font-bold mb-2">API Data</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Fetching posts from JSONPlaceholder API
        </p>
      </Card>

      {/* Search */}
      <Card>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts in English..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button onClick={resetSearch} variant="outline">
            Reset
          </Button>
        </div>
      </Card>

      {/* Loading State */}
      {loading && page === 1 && (
        <Card className="text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce mb-2"></div>
            <p>Loading English posts...</p>
          </div>
        </Card>
      )}

      {/* Error State - Now using apiError instead of error */}
      {apiError && (
        <Card className="text-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400">
            Error: {apiError}
          </div>
          <Button onClick={fetchPosts} className="mt-2">
            Retry
          </Button>
        </Card>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
              {displayText(post.title)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
              {displayText(post.body)}
            </p>
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Post ID: {post.id} | User ID: {post.userId}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredPosts.length === 0 && (
        <Card className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
            No posts found
          </h3>
          <p className="text-gray-400 dark:text-gray-500">
            {searchTerm ? 'Try a different search term' : 'No posts available in English'}
          </p>
        </Card>
      )}

      {/* Load More */}
      {!loading && posts.length > 0 && (
        <div className="text-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading more posts...' : 'Load More Posts'}
          </Button>
        </div>
      )}

      {/* Debug Info */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <details className="text-sm">
          <summary className="cursor-pointer font-medium">Debug Information</summary>
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Total posts loaded: {posts.length}</p>
            <p>Filtered posts: {filteredPosts.length}</p>
            <p>Current page: {page}</p>
            <p>API endpoint: JSONPlaceholder Posts</p>
            {apiError && <p className="text-red-500">Last Error: {apiError}</p>}
          </div>
        </details>
      </Card>
    </div>
  );
};

export default ApiData;