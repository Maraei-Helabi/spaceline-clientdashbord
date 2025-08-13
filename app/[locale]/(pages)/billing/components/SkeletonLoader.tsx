export default function SkeletonLoader() {
    return (
        <div className="flex items-center justify-between p-3 border rounded-lg animate-pulse bg-muted/50">
            <div className="flex-1">
                <div className="flex flex-col justify-between mb-1 gap-2">
                    <div className="h-4 w-32 bg-muted rounded mb-2" />
                    <div className="h-3 w-20 bg-muted rounded" />
                </div>
                <div className="h-3 w-24 bg-muted rounded mt-2" />
            </div>
            <div className="h-8 w-8 bg-muted rounded-full" />
        </div>
    );
}