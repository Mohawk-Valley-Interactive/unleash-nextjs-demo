interface Props {
  params: {
    slug: string;
  };
}

export default function Profile({ params }: Props) {
  return (
    <>
      <h1>hello {params.slug}</h1>
    </>
  );
}
