export default {
  getStoreDetailsWithAverageRating: () => `
BASE <http://buchmann.ro#>
PREFIX mapper: <http://www.ontotext.com/mapper/>
PREFIX schema: <http://schema.org#>
PREFIX : <http://buchmann.ro#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX reviewer: <http://buchmann.ro#/reviewer/>
PREFIX review: <http://buchmann.ro#/review/>
PREFIX store: <http://buchmann.ro#/store/>


select ?id ?name ?address (xsd:float(sum(?rating))/xsd:float(count(?rating)) as ?averageRating)   where { 
    ?id a schema:Store; 
       :hasName ?name;
       :hasAddress ?address;
       :hasReview ?review.
    ?review :hasDescription ?description;
			:hasRating ?rating.
} group by ?id ?name ?address
    `,
  getReviewsForStore: (storeId, search = "*") => `
BASE <http://buchmann.ro#>
PREFIX mapper: <http://www.ontotext.com/mapper/>
PREFIX schema: <http://schema.org#>
PREFIX : <http://buchmann.ro#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX reviewer: <http://buchmann.ro#/reviewer/>
PREFIX review: <http://buchmann.ro#/review/>
PREFIX store: <http://buchmann.ro#/store/>
PREFIX luc: <http://www.ontotext.com/connectors/lucene#>
PREFIX luc-index: <http://www.ontotext.com/connectors/lucene/instance#>

SELECT ?id ?date ?description ?rating ?reviewerName {
  ?search a luc-index:review_index ;
      luc:query "review:${search}" ;
      luc:entities ?id .
    ?id :writtenOn ?date;
       :hasDescription ?description;
       :hasRating ?rating;
       :writtenBy ?user_id;
       ^:hasReview ?store_id.
    ?user_id :hasName ?reviewerName.
    FILTER(xsd:string(?store_id) = "${storeId}").
}
  `,
};
