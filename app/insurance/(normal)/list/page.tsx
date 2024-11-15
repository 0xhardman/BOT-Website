export default function InsuranceListPage() {
    return <>
        {
            Array.from({ length: 14 }).map((_, index) => (
                <div key={index} className="text-center p-4 border">list item</div>
            ))
        }
    </>
}