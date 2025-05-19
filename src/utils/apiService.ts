
interface ApiResponse {
  response: string;
  error?: string;
}

export const callDeepSeekApi = async (prompt: string): Promise<ApiResponse> => {
  try {
    // This is for frontend use only. In production, this should be on a backend server.
    // For a more secure implementation, consider using Supabase edge functions.
    const API_KEY = localStorage.getItem('deepseekApiKey') || '';
    
    if (!API_KEY) {
      return {
        response: "DeepSeek API key not found. Please add it in settings.",
        error: "No API key"
      };
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: 'You are an expert coder assistant. Provide clear, efficient and working code solutions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API error:', errorData);
      return {
        response: "Sorry, there was an error calling the DeepSeek API. Please try again later.",
        error: errorData.error?.message || "API error"
      };
    }

    const data = await response.json();
    return {
      response: data.choices[0].message.content
    };
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return {
      response: "Sorry, there was an error connecting to the DeepSeek API. Please check your connection and try again.",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

export const callOpenRouterApi = async (prompt: string): Promise<ApiResponse> => {
  try {
    const API_KEY = localStorage.getItem('openrouterApiKey') || '';
    
    if (!API_KEY) {
      return {
        response: "OpenRouter API key not found. Please add it in settings.",
        error: "No API key"
      };
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'Indresh 2.0'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are Indresh 2.0 – a desi, lovable, funny, and highly accurate AI assistant. Respond like a close, helpful friend with a light desi touch. Keep responses practical and concise.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return {
        response: "Sorry, there was an error calling the OpenRouter API. Please try again later.",
        error: errorData.error?.message || "API error"
      };
    }

    const data = await response.json();
    return {
      response: data.choices[0].message.content
    };
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return {
      response: "Sorry, there was an error connecting to the OpenRouter API. Please check your connection and try again.",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

export const saveApiKey = (service: 'deepseek' | 'openrouter', key: string): void => {
  localStorage.setItem(`${service}ApiKey`, key);
};
