import { Card, Grid, Text } from '@nextui-org/react'

interface Props {
  link: string
  logos: Array<{ src: string; alt: string }>
  title: string
  description: string
}

export default function FooterCard({ link, logos, title, description }: Props) {
  return (
    <a href={link}>
      <Card css={{ height: 180, p: '$6', mw: '400px', mr: 24, mb: 24 }} isPressable isHoverable>
        <Card.Header>
          {logos.map((logo) => (
            <img className="rounded-full" key={logo.src} src={logo.src} alt={logo.alt} width="34px" height="34px" />
          ))}
          <Grid.Container css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: '$xs' }}>
                {title}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: '$2' }}>
          <Text>{description}</Text>
        </Card.Body>
      </Card>
    </a>
  )
}
