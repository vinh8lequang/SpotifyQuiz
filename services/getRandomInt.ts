 export default function getInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
    }

export function shuffle(array) {
        array.sort(function() { return Math.random() - 0.5 });
        return array;
}