import { Heading, Skeleton } from "@navikt/ds-react";

export const SkeletonLoader = () => {
  return (
    <div>
      <Skeleton variant='circle' width={80} height={80} />
      <Heading as={Skeleton} size='large'>
        Card-title
      </Heading>
      <Skeleton variant='text' width='100%' />
      <Skeleton variant='text' width='100%' />
      <Skeleton variant='text' width='80%' />
    </div>
  )
}