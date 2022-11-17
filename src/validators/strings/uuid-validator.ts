import { RegexValidator } from './regex-validator';

export class UUIDValidator extends RegexValidator {
    protected override get regexp() {
        return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    }
}
