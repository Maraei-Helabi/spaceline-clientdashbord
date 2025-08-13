function SkeletonSubCard() {
    return (
        <div className="animate-pulse my-2">
            <div className="bg-card rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-6 w-32 bg-muted rounded" />
                    <div className="h-6 w-16 bg-muted rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-4 w-4 bg-muted rounded-full" />
                    <div className="h-4 w-32 bg-muted rounded" />
                </div>
            </div>
        </div>
    );
}

export { SkeletonSubCard };
