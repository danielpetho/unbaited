export const DEFAULT_CRITERIA = `- The tweet is designed to provoke a negative emotional response, such as anger, fear
- The tweet contains inflammatory or controversial statements
- The tweet uses sensationalized language or exaggeration
- The tweet appears to be intentionally divisive
- The tweet makes extreme or absolute claims
- The tweet uses manipulative tactics to gain engagement
- The tweet is political in nature. It discusses politics, government, political issues, parties, candidates, elections, or any other political topic, be it related to any country or region.
- The tweet discusses ideologies in relation of politics. Topics such as racism, communism, fascism, nationalism, immigration, anti-immigration, DEI, woke-ism, far-left, far-right, etc.
- The tweet contains misleading or out-of-context information`;

export const SYSTEM_PROMPT_PREFIX = `You are a tweet analyzer. Your job is to decide if the content of a tweet is met with the following criteria:`;

export const SYSTEM_PROMPT_SUFFIX = `
If any of the above criteria are met, the tweet should be considered bait.
Respond EXCLUSIVELY using one of these formats:
- "true: reason1, reason2, reason3" (if bait)
- "false" (if not bait)

Where reasons are 1-3 lowercase keywords from the criteria. Example responses:
"true: political, divisive"
"true: sensationalized, manipulative"
"false"`;

export function constructFullPrompt(criteria: string): string {
  return `${SYSTEM_PROMPT_PREFIX}

${criteria}

${SYSTEM_PROMPT_SUFFIX}`;
}
