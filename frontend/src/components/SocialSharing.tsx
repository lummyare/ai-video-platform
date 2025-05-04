import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton
} from 'react-share';

interface SharingProps {
  generationId: string;
  videoUrl: string;
  prompt: string;
}

export default function SocialSharing({ generationId, videoUrl, prompt }: SharingProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${generationId}`;
  const title = `Check out this AI-generated video: "${prompt}"`;

  return (
    <div className="flex space-x-4 items-center">
      <TwitterShareButton url={shareUrl} title={title}>
        <div className="p-2 hover:bg-blue-100 rounded">
          <span>Twitter</span>
        </div>
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl} quote={title}>
        <div className="p-2 hover:bg-blue-100 rounded">
          <span>Facebook</span>
        </div>
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl} title={title}>
        <div className="p-2 hover:bg-blue-100 rounded">
          <span>LinkedIn</span>
        </div>
      </LinkedinShareButton>
      <button
        onClick={() => navigator.clipboard.writeText(shareUrl)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <span>Copy Link</span>
      </button>
    </div>
  );
}
