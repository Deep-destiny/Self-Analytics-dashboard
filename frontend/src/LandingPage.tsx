import { FormEvent, useState } from 'react';

interface RepositorySummary {
  name: string;
  url: string;
  language: string;
  description: string;
  updatedAt: string;
}

interface ProfileResponse {
  success: boolean;
  githubUsername: string;
  githubName: string;
  githubAvatar: string;
  githubBio: string;
  githubUrl: string;
  githubFollowers: number;
  githubFollowing: number;
  githubPublicRepos: number;
  leetcodeUsername: string;
  leetcodeName: string;
  leetcodeAvatar: string;
  leetcodeRanking: number;
  leetcodeSolved: number;
  leetcodeEasy: number;
  leetcodeMedium: number;
  leetcodeHard: number;
  leetcodeAcceptance: number;
  summary: string;
  highlights: string[];
  repositories: RepositorySummary[];
}

const defaultProfile: ProfileResponse = {
  success: true,
  githubUsername: 'octocat',
  githubName: 'Ava Chen',
  githubAvatar: 'https://avatars.githubusercontent.com/octocat',
  githubBio: 'Building polished developer experiences and data-driven products.',
  githubUrl: 'https://github.com/octocat',
  githubFollowers: 1824,
  githubFollowing: 312,
  githubPublicRepos: 48,
  leetcodeUsername: 'alice',
  leetcodeName: 'Alice Nguyen',
  leetcodeAvatar: 'https://assets.leetcode.com/users/avatars/avatar_2.png',
  leetcodeRanking: 18241,
  leetcodeSolved: 438,
  leetcodeEasy: 210,
  leetcodeMedium: 168,
  leetcodeHard: 60,
  leetcodeAcceptance: 87,
  summary: 'A thoughtful engineer blending product thinking with deep problem-solving.',
  highlights: [
    'Strong command of modern frontend engineering',
    'Consistent problem solving across algorithms and product work',
    'Clear communication and thoughtful design habits'
  ],
  repositories: [
    {
      name: 'developer-analytics-dashboard',
      url: 'https://github.com/example/dashboard',
      language: 'TypeScript',
      description: 'A polished analytics experience for GitHub and LeetCode presence.',
      updatedAt: '2 days ago'
    },
    {
      name: 'design-system-studio',
      url: 'https://github.com/example/design-system',
      language: 'React',
      description: 'Reusable UI primitives for modern product teams.',
      updatedAt: '5 days ago'
    }
  ]
};

/**
 * Two braided lines standing in for the two data streams (GitHub commits,
 * LeetCode submissions) that this page merges into one profile. It's the
 * page's one signature element — everything else stays quiet.
 */
const HeroWeave = () => (
  <svg className="hero-weave" viewBox="0 0 620 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M -20 60 C 100 60, 100 160, 220 160 C 340 160, 340 60, 460 60 C 540 60, 560 100, 640 100"
      stroke="var(--accent-git)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M -20 160 C 100 160, 100 60, 220 60 C 340 60, 340 160, 460 160 C 540 160, 560 120, 640 120"
      stroke="var(--accent-leet)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="220" cy="160" r="4" fill="var(--accent-git)" />
    <circle cx="220" cy="60" r="4" fill="var(--accent-leet)" />
    <circle cx="460" cy="60" r="4" fill="var(--accent-git)" />
    <circle cx="460" cy="160" r="4" fill="var(--accent-leet)" />
  </svg>
);

interface LandingPageProps {
  onOpenDashboard?: () => void;
}

const LandingPage = ({ onOpenDashboard }: LandingPageProps) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [profile, setProfile] = useState<ProfileResponse>(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Enter a GitHub profile URL and LeetCode username to generate your showcase.');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus('Fetching your profile snapshot...');

    try {
      const response = await fetch(`/api/profile?githubUrl=${encodeURIComponent(githubUrl)}&leetcodeUsername=${encodeURIComponent(leetcodeUsername)}`);
      const data = await response.json();
      // sanitize and merge fetched data with defaults to avoid undefined fields
      const safe: ProfileResponse = {
        ...defaultProfile,
        ...(typeof data === 'object' && data ? data : {}),
        highlights: (data && data.highlights) ? data.highlights : defaultProfile.highlights,
        repositories: (data && data.repositories) ? data.repositories : defaultProfile.repositories,
      } as ProfileResponse;
      setProfile(safe);
      setStatus(
        data?.githubError || data?.leetcodeError
          ? 'Loaded with partial data — check the handles you entered.'
          : 'Profile showcase ready.'
      );
    } catch (err) {
      console.error('Profile fetch failed', err);
      setProfile(defaultProfile);
      setStatus('Using a sample showcase because the profile fetch did not complete.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="top-nav">
        <span className="brand">dev<span>graph</span></span>
        {onOpenDashboard ? (
          <button type="button" className="nav-link" onClick={onOpenDashboard}>
            Live dashboard →
          </button>
        ) : null}
      </nav>

      <div className="landing-shell">
        <section className="hero-card">
          <HeroWeave />
          <div className="hero-copy">
            <p className="eyebrow">github + leetcode, merged</p>
            <h1>Track your coding footprint across GitHub and LeetCode in one place.</h1>
            <p className="hero-text">
              Point it at a GitHub profile and a LeetCode handle. It pulls live stats from both,
              lines them up side by side, and gives you one clean snapshot of where you stand.
            </p>
            <form onSubmit={handleSubmit} className="input-card">
              <label>
                GitHub URL
                <input value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} placeholder="https://github.com/yourname" />
              </label>
              <label>
                LeetCode username
                <input value={leetcodeUsername} onChange={(event) => setLeetcodeUsername(event.target.value)} placeholder="your_handle" />
              </label>
              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Generate showcase'}</button>
            </form>
            <p className="status-text">{status}</p>
          </div>

          <div className="profile-panel">
            <div className="profile-header">
              <img src={profile.githubAvatar} alt={profile.githubName} className="avatar" />
              <div>
                <h2>{profile.githubName}</h2>
                <p>{profile.githubUsername} · {profile.leetcodeUsername}</p>
              </div>
            </div>

            <p className="bio">{profile.githubBio}</p>
            <div className="stats-grid">
              <div><strong>{profile.githubFollowers}</strong><span>Followers</span></div>
              <div><strong>{profile.githubFollowing}</strong><span>Following</span></div>
              <div><strong>{profile.githubPublicRepos}</strong><span>Repos</span></div>
              <div><strong>#{profile.leetcodeRanking}</strong><span>LC Rank</span></div>
            </div>

            <div className="summary-card">
              <h3>Profile summary</h3>
              <p>{profile.summary}</p>
              <ul>
                {(profile.highlights || defaultProfile.highlights).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="details-grid">
          <div className="card-panel">
            <h3>LeetCode snapshot</h3>
            <div className="metric-row">
              <span>Solved</span>
              <strong>{profile.leetcodeSolved}</strong>
            </div>
            <div className="metric-row">
              <span>Easy / Medium / Hard</span>
              <strong>{profile.leetcodeEasy} / {profile.leetcodeMedium} / {profile.leetcodeHard}</strong>
            </div>
            <div className="metric-row">
              <span>Acceptance</span>
              <strong>{profile.leetcodeAcceptance}%</strong>
            </div>
          </div>

          <div className="card-panel">
            <h3>Featured repositories</h3>
            {(profile.repositories || defaultProfile.repositories).map((repo) => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className="repo-card">
                <div>
                  <strong>{repo.name}</strong>
                  <p>{repo.description}</p>
                </div>
                <span>{repo.language}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;