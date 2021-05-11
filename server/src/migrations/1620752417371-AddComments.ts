import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddComments1620752417371 implements MigrationInterface {
  name = 'AddComments1620752417371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "comment" ("userId" integer NOT NULL, "postId" integer NOT NULL, "commentId" integer NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5285b8e757c1c3d03b6f7a34ff" PRIMARY KEY ("userId", "postId", "commentId"))',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"',
    );
    await queryRunner.query('DROP TABLE "comment"');
  }
}
