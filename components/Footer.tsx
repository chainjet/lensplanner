import { Button, Container, Grid, Row, Text } from '@nextui-org/react'
import FooterCard from './FooterCard'

export default function Footer() {
  return (
    <Container style={{ marginTop: 16 }}>
      <Row justify="center" align="center" css={{ mb: 16 }}>
        <Text style={{ fontSize: 28 }}>Discover more Lens tools</Text>
      </Row>
      <Grid.Container gap={2} justify="center">
        <FooterCard
          link="https://chainjet.io/workflows/641db92503e085ca49816372"
          logos={[
            {
              src: 'https://raw.githubusercontent.com/chainjet/assets/master/dapps/mirror.xyz.png',
              alt: 'Mirror logo',
            },
            {
              src: 'https://raw.githubusercontent.com/chainjet/assets/master/integrations/openai.jpg',
              alt: 'OpenAI logo',
            },
            {
              src: 'https://chainjet.io/img/lens.png',
              alt: 'Lens logo',
            },
          ]}
          title="Share a summary of your new Mirror posts on Lens Protocol"
          description="Every time you publish a new Mirror article, use OpenAI to generate a summary, and post it to Lens."
        />
        <FooterCard
          link="https://chainjet.io/workflows/637e651a37aab4c08aefb7bb"
          logos={[
            {
              src: 'https://chainjet.io/img/lens.png',
              alt: 'Lens logo',
            },
            {
              src: 'https://raw.githubusercontent.com/chainjet/assets/master/integrations/discord.svg',
              alt: 'Discord logo',
            },
          ]}
          title="Share Lens Posts to Discord"
          description="Automatically share all your Lens posts on a Discord channel."
        />
        <FooterCard
          link="https://chainjet.io/workflows/63a9f0b125fb61a9ea27f6f8"
          logos={[
            {
              src: 'https://chainjet.io/img/lens.png',
              alt: 'Lens logo',
            },
            {
              src: 'https://raw.githubusercontent.com/chainjet/assets/master/dapps/xmtp.org.png',
              alt: 'XMTP logo',
            },
          ]}
          title="Welcome new Lens followers with a DM"
          description="Present your self to your new followers with an automated DM."
        />
        <FooterCard
          link="https://lenster.xyz/u/RemindMeBot"
          logos={[
            {
              src: 'https://raw.githubusercontent.com/chainjet/assets/master/integrations/twitter.svg',
              alt: 'Twitter logo',
            },
            {
              src: 'https://chainjet.io/img/lens.png',
              alt: 'Lens logo',
            },
          ]}
          title="Share tweets on Lens"
          description="Share all your tweets on Lens. You can also setup filters to share specific posts."
        />
        <FooterCard
          link="https://lenster.xyz/u/RemindMeBot"
          logos={[
            {
              src: 'https://raw.githubusercontent.com/chainjet/assets/master/integrations/rss.svg',
              alt: 'RSS logo',
            },
            {
              src: 'https://chainjet.io/img/lens.png',
              alt: 'Lens logo',
            },
          ]}
          title="Share RSS items on Lens"
          description="Share items matching an RSS feed to Lens. This can be your blog, podcast, YouTube channel, or any other RSS feed."
        />
        <FooterCard
          link="https://lenster.xyz/u/RemindMeBot"
          logos={[
            {
              src: 'https://ipfs.io/ipfs/bafkreigoc34yhpkwsboktuvtu3va2di3j3apln2pkfdbkpcmnikfwc2zre',
              alt: 'RemindMeBot logo',
            },
          ]}
          title="@RemindMeBot.lens"
          description="Mention the bot on a Lens post or comment to receive reminder notifications."
        />
      </Grid.Container>
      <Row justify="center" align="center" css={{ mt: 4 }}>
        <a href="https://chainjet.io/templates">
          <Button>View More &gt;</Button>
        </a>
      </Row>
    </Container>
  )
}
