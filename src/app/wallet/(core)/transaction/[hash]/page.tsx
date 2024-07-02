export default function Page({ params }: { params: { hash: string } }) {
    return <>Hash: {params.hash}</>;
}
