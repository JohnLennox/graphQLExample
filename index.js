import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as fs from 'fs';


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    bookId: Int
    name: String
    pages: Int
    author: Author    
  }

  type Author {
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(nameContains: String): [Book]
  }

  type Query {
    books(idEquals: Int): [Book]
  }

  # Define Mutations 
  type Mutation {
    addBook(name: String!, pages: Int!, authorName: String): Book
  }
`;

var books = JSON.parse(fs.readFileSync("books.json"));
console.log(`Books: ${books}`);

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (parent, args, contextValue, info) => {
      // console.log(info);
      if(args.nameContains){
        return books.filter(book => book.name.includes(args.nameContains));
      }
      if(args.idEquals){
        return books.filter(book => book.bookId == (args.idEquals))
      }
      return books;
    }
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBookId = books.reduce((acc, book) => Math.max(acc, book.bookId), -1) + 1;
      const newBook = { bookId: newBookId, name: args.name, pages: args.pages, author: {name: args.authorName} };
      books.push(newBook);
      // Attempt to save the updated books array to the file
      fs.writeFile('books.json', JSON.stringify(books, null, 2), (err) => {
        if (err) {
          console.error('Failed to save the book to file:', err);
          // Handle error appropriately in your application context
        }
      });
      return newBook;
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
