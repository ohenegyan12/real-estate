import React, { useEffect } from 'react';

const SEO = ({ title, description, name, type, image, url }) => {
    useEffect(() => {
        // Update Title
        if (title) document.title = title;

        // Helper to update meta tags
        const updateMeta = (name, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateOgMeta = (property, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Update Meta Tags
        updateMeta('description', description);
        updateMeta('twitter:creator', name);
        updateMeta('twitter:card', type);
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', image);

        updateOgMeta('og:type', type);
        updateOgMeta('og:title', title);
        updateOgMeta('og:description', description);
        updateOgMeta('og:image', image);
        updateOgMeta('og:url', url);

    }, [title, description, name, type, image, url]);

    return null;
}

SEO.defaultProps = {
    title: 'Owusu Homes',
    description: 'Find your dream home with Owusu Homes - Your trusted partner in real estate.',
    image: 'https://owusuhomes.com/og-image.jpg',
    url: 'https://owusuhomes.com',
    type: 'website',
    name: 'Owusu Homes'
};

export default SEO;
