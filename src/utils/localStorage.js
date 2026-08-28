export const getHistory = () => {
    const history = localStorage.getItem('movieHistory');
    return history ? JSON.parse(history) : [];
};

export const addHistory = (movie) => {
    let history = getHistory();
    // Xóa nếu phim đã tồn tại để đưa lên đầu danh sách
    history = history.filter(item => item.id !== movie.id);
    history.unshift(movie); // Thêm vào đầu
    if (history.length > 50) history.pop(); // Giới hạn 50 phim
    localStorage.setItem('movieHistory', JSON.stringify(history));
};

export const getBookmarks = () => {
    const bookmarks = localStorage.getItem('movieBookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
};

export const toggleBookmark = (movie) => {
    let bookmarks = getBookmarks();
    const index = bookmarks.findIndex(item => item.id === movie.id);
    if (index > -1) {
        bookmarks.splice(index, 1); // Đã có -> xóa đi
    } else {
        bookmarks.unshift(movie); // Chưa có -> thêm vào
    }
    localStorage.setItem('movieBookmarks', JSON.stringify(bookmarks));
    return index === -1; // trả về true nếu vừa thêm, false nếu vừa xóa
};

export const isBookmarked = (id) => {
    const bookmarks = getBookmarks();
    return bookmarks.some(item => item.id === id);
};
