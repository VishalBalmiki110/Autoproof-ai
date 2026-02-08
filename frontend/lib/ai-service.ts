// Simple AI service for generating proof summaries
// Note: This uses a mock implementation - replace with actual AI API if needed

export async function generateProofSummary(repoUrl: string): Promise<string> {
    // Extract repo info from URL
    const repoName = extractRepoName(repoUrl)

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate intelligent summary based on repo URL
    // In production, this would call an AI API like OpenAI
    const summaries = [
        `Generating cryptographic proof of deployment for ${repoName} repository`,
        `Creating immutable blockchain record for ${repoName} deployment`,
        `Verifying and logging ${repoName} deployment on BSC Testnet`,
        `Establishing onchain proof of ${repoName} repository deployment`,
    ]

    // For demo purposes, we'll use a deterministic selection
    const index = repoUrl.length % summaries.length
    return summaries[index]
}

function extractRepoName(url: string): string {
    try {
        // Extract repo name from GitHub URL
        // e.g., https://github.com/user/repo -> repo
        const parts = url.split('/')
        return parts[parts.length - 1] || 'repository'
    } catch {
        return 'repository'
    }
}

// Optional: Function to call actual AI API
export async function generateAIProofSummary(repoUrl: string): Promise<string> {
    // Example with OpenAI API (commented out - requires API key)
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Generate a concise one-line summary for creating a blockchain proof of deployment for this GitHub repository: ${repoUrl}`
        }],
        max_tokens: 50
      })
    })
    
    const data = await response.json()
    return data.choices[0].message.content.trim()
    */

    // For now, use the mock implementation
    return generateProofSummary(repoUrl)
}
