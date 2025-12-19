import { useData } from '../../context/DataContext';
import { Star, Trash2 } from 'lucide-react';

const Reviews = () => {
    const { reviews, users, deleteReview } = useData();

    // Enrich reviews with user data
    const enrichedReviews = reviews.map(review => {
        const reviewer = users.find(u => u.id === review.reviewerId);
        const provider = users.find(u => u.id === review.providerId);
        return {
            ...review,
            reviewerName: reviewer?.name || 'Unknown User',
            providerName: provider?.name || 'Unknown Provider',
            reviewerAvatar: reviewer?.avatar
        };
    });

    const handleDelete = (id) => {
        if (window.confirm('Delete this review permanently?')) {
            deleteReview(id);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>
                <p className="text-gray-500">Moderate detailed feedback from customers</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {enrichedReviews.length > 0 ? (
                    enrichedReviews.map(review => (
                        <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={review.reviewerAvatar}
                                        alt=""
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
                                        <p className="text-sm text-gray-500">reviewed <span className="font-medium text-gray-800">{review.providerName}</span></p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>

                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-4">{review.comment}</p>

                            <div className="flex justify-end pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="flex items-center text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove Review
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                        No reviews found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
