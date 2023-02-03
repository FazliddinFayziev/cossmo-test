import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'l1wjmm1p',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    ignoreBrowserTokenWarning: true,
    token: "skLEs98P7BDwnwJhmbWx8jYhIdOg7WnxB8ejga8D8POvR6wzAimV1hkiWANbRrhfMuQAL8wBAjEb8UUCxjJoXUQqOjj2nCQJAyokCY1YA6vQTwpZx5rMf0ArZd3HCxfz2nX0fHy0YG3ErqArMBFjwp2EGfYRkdINfbv0rVmut3ee09HCFMzM"
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);