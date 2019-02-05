for DIR in `find ./packages -mindepth 1 -maxdepth 1 -type d`
do
    npm run release $(basename "$DIR")
done