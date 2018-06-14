// Quy định nội dung hiển thị trên sidebar với từng actor
const SidebarSpecification = {
    student: [
        {
            link: '/internship',
            text: 'Thực tập',
            icon: 'business'
        },
        {
            link: '/report',
            text: 'Báo cáo',
            icon: 'description'
        },
        {
            link: '/review',
            text: 'Đánh giá',
            icon: 'announcement'
        },
    ],
    lecturer: [

    ],
    partner: [

    ],
    admin: [
        {
            link: '/internship',
            text: 'Thực tập',
            icon: 'business'
        },
    ]
};

export default SidebarSpecification;