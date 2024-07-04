export default function Page({ params }: { params: { signature: string } }) {
    return <>Signature: {params.signature}</>;
}
